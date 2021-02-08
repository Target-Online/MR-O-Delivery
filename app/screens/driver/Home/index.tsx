
import React from 'react';
import { Modal,TouchableOpacity as Btn,View,Image as RnImg,
  Text,StatusBar , ImageBackground, Linking, Platform} from 'react-native';
import { Switch } from 'native-base'
import images from '../../../assets/images'
import DeliveryGuyIcon from '../../../assets/icons/DeliveryGuyIcon';
import { Colors } from '../../../constants';
import { withAppContext } from '../../../AppContext';
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import BagIcon from '../../../assets/icons/BagIcon'
import OnlineIcon from '../../../assets/icons/OnlineIcon'
import OfflineIcon from '../../../assets/icons/OfflineIcon'
import { database } from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import Inactive from  '../../../components/Inactive'
import ConfirmItems from '../OrderProgress/ConfirmItems';
import strings from '../../../constants/strings';
import styles from './styles'
import DeliveredOrder from './DeliveredOrder';
import { OrderState , IAppContext, IOrder , } from 'types';
import CustomerCard from './CustomerCard';
import OrderInTransit from './OrderInTransit';
import IncomingOrder from './IncomingOrder';
import { mockOrder } from 'utils/mocks';

type IProps = IAppContext & StackNavigationProp<any>;

interface IState {
  isModalVisible: boolean;
  isOnline?: boolean;
  isVacant?: boolean;
  isActive?: boolean;
  orderStatus : OrderState ; 
  order?: IOrder;
  status?: "offline" | "vacant" | "busy";
  orderId?: string;
}

class Home extends React.Component<IProps, IState> {

    onChildAdded: (a: import("firebase").RNFirebase.database.DataSnapshot | null, b?: string | undefined) => import("firebase").RNFirebase.database.QuerySuccessCallback;
    onDriverUpdated: any;
    onOrderUpdated: any;

    constructor(props: any){
      super(props)
      const {context : {currentUser :{status }}} = this.props

      this.state = {
        isModalVisible : false,
        isOnline : false,
        isVacant : false,
        status,
        orderStatus : "pending",
        order : undefined
      }
    }

    recordNewOrderOfFocus = (newOrder : IOrder , orderId : string) => {     
      this.setMyOrder(newOrder)
      this.setState({isModalVisible : true, order: newOrder, orderId })
    }

    componentWillMount = async () => {

      const {context : {currentUser :{phoneNumber , isActive, isOnline, isVacant} , playSound , setOrder}} = this.props

      this.setState({isOnline , isVacant , isActive})
      this.onChildAdded = database().ref('/orders').on('child_added', async (snapshot: { val: () => any; key: any; }) => {
          const order = snapshot.val()
          const orderId = snapshot.key
          const {status , driver } = order

          if(status === "pending" && driver && driver.id === phoneNumber){ //and I'm the driver
            this.setState({orderStatus : "pending"})
            playSound()
            this.recordNewOrderOfFocus(order, orderId)
            
            this.onOrderUpdated = database().ref(`/orders/${orderId}`).on('value', (snapshot: { val: () => any; key: any; }) => {
              const order = snapshot.val()
              if(order){
                 if (order.status == "cancelled"){
                   this.setState({ isModalVisible : false, orderStatus : "pending", order : null})
                 }
                setOrder(order)
              }         
            })
          }    
      })        

      this.onDriverUpdated = database().ref(`/users/${phoneNumber}`).on('value', (snapshot: { val: () => any; key: any; }) => {
          const driver = snapshot.val()
          if(driver){
            const {isOnline, isVacant , isActive}  = driver
            this.setState({isOnline , isVacant , isActive})
          }         
      })
    }

    setMyOrder = (theOrder : IOrder) => {
      const {context : {setOrder,order}} = this.props
      setOrder(theOrder)
    }

    componentWillUnmount = () => {
      const {context : {currentUser :{phoneNumber } , order :{orderId} , setOrder}} = this.props
      database().ref('/orders').off('child_added', this.onChildAdded )
      database().ref(`/users'${phoneNumber}`).off('value', this.onDriverUpdated )  
      database().ref(`/orders'${orderId}`).off('value', this.onOrderUpdated)    
    }

    closeModal = () =>{  this.setState({isModalVisible : false})}

    changeOrderProgress = (orderStatus : OrderState) => { 
      const { orderId } = this.state
      const { context : {updateOrderStatus, order } } = this.props
      const nowNow = moment(new Date()).toString()
      const addOn = orderStatus === "confirmed" ? {confirmedAt : nowNow} : (orderStatus === "collected" ? {collectedAt : nowNow} : orderStatus === "delivered" ? {deliveredAt : nowNow} : {})
      const updatedOrder = {...order, status : orderStatus , ...addOn  }
      this.setState({order :  updatedOrder})
      updateOrderStatus(orderId,updatedOrder)
      this.setState({orderStatus})
    }

    renderCustomerCard = () =>  <CustomerCard />
  
    renderParcelDetails = () => {

      const {order , order :{ orderType , storeName}} = this.state
      const {name, description} = order.items[0]
      const isShopping = orderType === "Shopping"

      return(
        <View style={styles.parcelDetailsWrapper}>
          {isShopping ? <BagIcon width={30} height={30} /> : <ParcelIcon width={30} height={30} />}
          <View style={{marginLeft : 8}}>
            <Text style={{fontSize : 12,}}>{isShopping? "Shopping from :" :  name}</Text>
            <Text numberOfLines={1} style={{fontSize : 11, color : "grey"}} >{isShopping? storeName :  description}</Text>
          </View>
        </View>
      )
    }

    _handlePressDirections = (target: { geometry: { location: any; }; postalCode: any; city: any; }, addressLabel : string) => {
      let { geometry : {location} } = target;
      const {lat,lng} = location
      const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
      const latLng = `${lat},${lng}`;
      const label = addressLabel || "Destination";
      const url = Platform.select({ ios: `${scheme}${label}@${latLng}`, android: `${scheme}${latLng}(${label})`}) || ""
      Linking.openURL(url); 
    }

    renderIncomindOrder = () => {
      const {context : {updateDriverStatus}} = this.props
        return(
          <IncomingOrder 
            order={this.state.order}
            onAccept={()=> {
              updateDriverStatus({isVacant : false})
              this.changeOrderProgress("confirmed")                 
            }} 
            style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange}]} 
          />
        )
    }

    renderOrderInProgress = () =>{

      const {orderStatus, } = this.state
      const {order : {pickUpAddress, dropOffAddress , orderType ,  customer }} = this.props.context
      const orderCollected = orderStatus === "collected"
      const isGroceries =  orderType === "Shopping"

      return(
        <OrderInTransit
          orderStatus={orderStatus}
          onGetDirections={() => this._handlePressDirections(orderCollected ? dropOffAddress : pickUpAddress , orderCollected ? strings.deliveryAddress : strings.collectionAddress)}
          onButtonPress={()=>{ 
            if (isGroceries){
                if (orderStatus == "collected"){ this.changeOrderProgress("delivered")  }
                else{
                  this.changeOrderProgress("shopping")  
                  this.setState({isModalVisible : false})
                }
            }
            else{ this.changeOrderProgress(orderCollected ? "delivered" : "collected")}}
          } 
        />
      )
    }

    renderOrderItemsConfirmation = () => {
      return (
        <ConfirmItems onConfirmed={()=>{
          this.changeOrderProgress("collected")
          this.setState({isModalVisible : true}) }} 
        />)
    }

    renderDeliveredOrder = () =>{

      const {order : { customer }} = this.state
      const {context : { updateDriverStatus, setRatingsVisible, setUserInRating}} = this.props

        return(
          <DeliveredOrder 
            onDone={()=>{
              updateDriverStatus({isVacant : true})
              this.setState({isModalVisible : false})
              setUserInRating(customer)
              setRatingsVisible(true)
            }}  
          />
      )
    }

    renderInactiveModal = () =>  <Inactive isActive={this.state.isActive} />

    renderNewOrderModal = () => {

      const {isModalVisible , orderStatus} = this.state
      return(
        <Modal 
          key="mod"
          transparent
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          {orderStatus === "pending" ? this.renderIncomindOrder() : 
            ["confirmed", "collected"].includes(orderStatus) ? this.renderOrderInProgress():
            this.renderDeliveredOrder()
          }
        </Modal>
      )
    }
  
    toggleOnline = (isOnline : boolean) => {
      const {context : {updateDriverStatus , setShowAlert, setAlertData, currentUser : {phoneNumber} }} = this.props

      if(!isOnline){  //if going offline, confirm change
         setAlertData({title : "Change Status" , text : strings.confirmStateChange, buttons : [ 
          {label : "Yes",onPress : ()=>{updateDriverStatus({isOnline})}} , { label :  "No", onPress : ()=>{} } ]})
          return setShowAlert(true)
      }
      
      updateDriverStatus({isOnline})
      if (isOnline){ updateDriverStatus({isVacant : true})}
    }

    render(){
      const {context : {currentUser :{ displayName, profilePicURL}, sendRequest, generateOrderId }, } = this.props
      const {isOnline , orderStatus} = this.state
      const imgSrc =  profilePicURL ? {uri : profilePicURL} : images.headShot

      if (orderStatus === "shopping"){
        return this.renderOrderItemsConfirmation()
      }
      return [
          this.renderNewOrderModal(), 
          this.renderInactiveModal(),     
            <View key="main" style={styles.container} >
            <StatusBar barStyle="dark-content" />    
            <ImageBackground source={images.homeBg} style={{width : "100%", height : "100%"}}>
              <View style={styles.topHeaderWrapper}>
                <View style={{position: "absolute", bottom : 24,right:12}}>
                  <DeliveryGuyIcon />
                </View>
                <Btn onPress={()=> {  }} >
                  <View style={styles.imgWrapper}>                 
                    <RnImg style={styles.displayPic} resizeMode="cover" source={imgSrc} />
                  </View>
                </Btn>
                <Text style={styles.welcomeText} >{strings.welcomeBack}</Text>
                <Text style={styles.displayName} >{displayName}</Text>
                </View>
            </ImageBackground>
          
            <View style={styles.bottom} >              
                  <View style={styles.switchWrapper} >
                    <Text style={styles.switchLabel} >
                     {isOnline ? strings.online : strings.offline}
                    </Text>
                    <View style={{marginHorizontal: 8}} />
                    <Switch onValueChange={()=> this.toggleOnline(isOnline ? false : true)} value={isOnline} style={{width : 24}} />
                  </View>
                  <View style={{width : "100%",height : 78,alignItems : "center"}}> 
                    {isOnline ? <OnlineIcon /> : <OfflineIcon />}
                    <Text style={styles.onOffText}>
                      {isOnline ? strings.currentlyAccepting :
                      strings.youreOffline}
                    </Text>
                  </View>
                  <Btn
                    style={styles.addMockOrder}
                    onPress={() => {
                      sendRequest(generateOrderId(), mockOrder, ()=>{},()=>{})
                     }}    
                  >
                    <Text style={{color : "#fff"}} > Add Mock Order</Text>
                  </Btn>
              </View>           
            </View>    
      ]
    }
};

export default withAppContext(Home)