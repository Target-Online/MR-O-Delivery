
import React from 'react';
import { Modal,TouchableOpacity as Btn,View,Image as RnImg,
  Text,StatusBar , ImageBackground, Linking, Platform} from 'react-native';
import { Switch } from 'native-base'
import images from '../../../assets/images'
import DeliveryGuyIcon from '../../../assets/icons/DeliveryGuyIcon';
import { Colors } from '../../../constants';
import { withAppContext, testDriver } from '../../../AppContext';
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import BagIcon from '../../../assets/icons/BagIcon'
import OnlineIcon from '../../../assets/icons/OnlineIcon'
import OfflineIcon from '../../../assets/icons/OfflineIcon'
import LocationIcon from '../../../assets/icons/LocationIcon';
import { database } from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import Inactive from  '../../../components/Inactive'
import ConfirmItems from '../OrderProgress/ConfirmItems';
import strings from '../../../constants/strings';
import styles from './styles'
import DeliveredOrder from './DeliveredOrder';
import { OrderState , IAppContext, IOrder , } from 'types';

type IProps = IAppContext & StackNavigationProp<any>;

interface IState {
  isModalVisible: boolean;
  isOnline?: boolean;
  isVacant?: boolean;
  isActive?: boolean;
  newState : OrderState ; 
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
        newState : "pending",
        order : undefined
      }
    }

    recordNewOrderOfFocus = (newOrder : IOrder , orderId : string) => {     
      const {context : {order}} = this.props
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
            this.setState({newState : "pending"})
            playSound()
            this.recordNewOrderOfFocus(order, orderId)
            
            this.onOrderUpdated = database()
            .ref(`/orders/${orderId}`)
            .on('value', (snapshot: { val: () => any; key: any; }) => {
              const order = snapshot.val()
              if(order){
                 if (order.status == "cancelled"){
                   this.setState({ isModalVisible : false, newState : "pending", order : null})
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

    closeModal = () =>{
      this.setState({isModalVisible : false})
    }

    changeOrderProgress = (newState : OrderState) => { 
      const { orderId } = this.state
      const { context : {updateOrderStatus, order } } = this.props
      const nowNow = moment(new Date()).toString()
      const addOn = newState === "confirmed" ? {confirmedAt : nowNow} : (newState === "collected" ? {collectedAt : nowNow} : newState === "delivered" ? {deliveredAt : nowNow} : {})
      const updatedOrder = {...order, status : newState , ...addOn  }
      this.setState({order :  updatedOrder})
      updateOrderStatus(orderId,updatedOrder)
      this.setState({newState})
    }

    renderCustomerCard = () => {

      const {context : {order}} = this.props
      const { customer , distance,paymentMethod ,items} = order || {}
      const {displayName , firstname} = customer || {}
      const profilePicURL = ""
      const cardSource = profilePicURL || images.headShot

      return(
        <View style={{borderBottomWidth : 0.75 , borderBottomColor : Colors.overlayDark10,flexDirection : "row" , height : 74, alignItems : "center", width: "100%"}} >  
          <View style={{width : 40, height : 40, borderRadius : 20, backgroundColor : Colors.overlayDark10 ,marginRight: 12}} >
            <RnImg style={{width : "100%", height : "100%"}} source={cardSource} />
          </View>
          <View style={{height : "100%",width : "100%",justifyContent : "center"}}>
     
            <Text style={styles.customerHeader} >{displayName || firstname}</Text>
            <Text style={styles.customerHeader} >{`${distance} km`}  
              <Text style={[styles.activeTextStyle,{marginLeft : 32}]} >{` ${paymentMethod || "Cash"} Payment`}</Text>
            </Text>

          </View>
        </View>
      )
    }

    renderParcelDetails = () => {

      const {order , order :{ orderType , storeName}} = this.state
      const {name, description ,} = order.items[0]
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

    renderNewRequestDecision = () => {

      const { order,newState } = this.state
      const {context : {updateDriverStatus}} = this.props

      if(order){
        const {pickUpAddress, dropOffAddress , orderType} = order || { pickUpAddress : {}, dropOffAddress : {} }
        return(
          <View style={styles.modalInnerContainer}>
            <View style={styles.newReqContainer}>
              {newState === "pending" && <Text style={styles.incomingText}>Incoming Request</Text>}
              {this.renderCustomerCard()}
              {this.renderParcelDetails()}
              <View style={styles.routeSummaryRow}> 
                  <View style={styles.routePath}>
                    <View style={styles.pickupIconOutter} >
                      <View style={styles.pickupIconInner} />
                    </View>              
                    <View style={styles.path} />
                    <View style={{width:8,height:8,alignItems : "center" }} >
                      <LocationIcon width={12} height={12} />
                    </View>
                  </View>
                  <View style={styles.addressesWrapper}>
                      <View style={styles.textAreaStyles} >
                          <Text style={[styles.addressInput,{fontSize :11, color : "grey"}]} >Pickup</Text>
                          <Text numberOfLines={2} style={styles.addressInput} >
                              {pickUpAddress.description}
                          </Text>    
                      </View>
                      <View style={{height : 1,backgroundColor: "white", width: "100%",alignSelf : "center"}}></View>
                      <View style={styles.textAreaStyles} >
                          <Text style={[styles.addressInput,{fontSize :11, color : "grey"}]} >Drop-Off</Text>
                          <Text numberOfLines={2} style={styles.addressInput} >
                            {dropOffAddress.description}
                          </Text>   
                      </View>
                  </View>
                </View>

              <View style={styles.bottomBtnswrapper}>
                <Btn 
                  onPress={()=> {
                    updateDriverStatus({isVacant : false})
                    this.changeOrderProgress("confirmed")                 
                  }} 
                  style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange}]} 
                >
                  <Text  style={styles.acceptDeclineText} > Accept </Text>
                </Btn>
              </View>
            </View>
          </View>
        )
      }
      return null
    }

    renderOrderInProgress = () =>{

      const {newState, } = this.state
      const {order : {pickUpAddress, dropOffAddress , orderType ,  customer }} = this.props.context
      const orderCollected = newState === "collected"
      const isGroceries =  orderType === "Shopping"

      return(
        <View style={styles.modalInnerContainer}>
         <View style={styles.newReqContainer}>
           {this.renderCustomerCard()}
           {this.renderParcelDetails()}
          <Text style={{alignSelf : "center" , marginVertical : 4}} >{
            !orderCollected ? (isGroceries ? `Head to the store and purchase ${customer.displayName}'s items` : "On route to collect the parcel") :
             "Dropping off the parcel "} 
          </Text>
          <View style={styles.newReqInnerContainer}>        
              <View style={[styles.routePath,{height : 42} ]}>
                <View style={{width:8,height:8,alignItems : "center" }} >
                  <LocationIcon width={12} height={12} />
                </View>
              </View>
              <View style={[styles.addressesWrapper,{height : 42}]}>                
                  <View style={styles.textAreaStyles} >
                      <Text style={[styles.addressInput,{fontSize :12, color : "grey"}]} > {orderCollected? "Drop-Off" : isGroceries ? "Store Address" : "Pick-Up"}</Text>
                      <Text numberOfLines={2} style={styles.addressInput} >
                        {orderCollected ? dropOffAddress.description : pickUpAddress.description }
                      </Text>   
                  </View>
              </View>
            </View>

            <View style={[styles.bottomBtnswrapper,{flexDirection : "column",height : 130,alignItems : "center" } ]}>
              <Btn
                onPress={() => this._handlePressDirections(orderCollected ? dropOffAddress : pickUpAddress , orderCollected ? "Delivery Address" : "Collection Address")}
              style={[styles.btnStyle , { backgroundColor : "#fff", borderWidth : 1 , borderColor : Colors.overlayDark70 ,width : 192} ]}>
                <Text style={[styles.acceptDeclineText,{color : Colors.overlayDark70, }]} > Get Directions </Text>
              </Btn>
              <Btn onPress={()=>{ 
                if (isGroceries){
                    if (newState == "collected"){ this.changeOrderProgress("delivered")  }
                    else{
                      this.changeOrderProgress("shopping")  
                      this.setState({isModalVisible : false})
                    }
                }
                else{ this.changeOrderProgress(orderCollected ? "delivered" : "collected")}
                }
              } 
                style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange, width : 192,marginTop:4 }]} >
                <Text  style={styles.acceptDeclineText} >
                  {orderCollected ? "Confirm Delivery" : isGroceries ? "View Shopping List" : "Confirm Collection"}
                </Text>
              </Btn>
            </View>
          </View>
        </View>
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

      const {isModalVisible , newState} = this.state
      return(
        <Modal 
          key="mod"
          transparent
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          {newState === "pending" ? this.renderNewRequestDecision() : 
            ["confirmed", "collected"].includes(newState) ? this.renderOrderInProgress():
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
      const {context : {currentUser :{ displayName, profilePicURL}, sendRequest,setRatingsVisible, setUserInRating}} = this.props
      const {isOnline , newState} = this.state
      const imgSrc =  profilePicURL ? {uri : profilePicURL} : images.headShot

      if (newState === "shopping"){
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
                <Text style={styles.welcomeText} >
                  Welcome Back,               
                </Text>
                <Text style={styles.displayName} >
                  {displayName}
                </Text>
                </View>
            </ImageBackground>
          
            <View style={styles.bottom} >              
                  <View style={styles.switchWrapper} >
                    <Text style={styles.switchLabel} >
                     {isOnline ? "Online" : "Offline"}
                    </Text>
                    <View style={{marginHorizontal: 8}} />
                    <Switch onValueChange={()=> this.toggleOnline(isOnline ? false : true)} 
                        value={isOnline} style={{width : 24}} 
                    />
                  </View>
                  <View style={{width : "100%",height : 78,alignItems : "center"}}> 
                    {isOnline ? <OnlineIcon /> : <OfflineIcon />}
                    <Text style={styles.onOffText}>
                      {isOnline ? "Currently accepting requests" :
                      "You're offline and won't receive any requests"}
                    </Text>
                  </View>
                  <Btn
                    style={styles.addMockOrder}
                    onPress={ async () => {
                      setUserInRating(testDriver)
                      setRatingsVisible(true)
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