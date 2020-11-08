
import React from 'react';
import {
  Modal,StyleSheet,TouchableOpacity as Btn,View,Image as RnImg,
  Text,StatusBar , ImageBackground, Linking, Platform} from 'react-native';
import { Switch } from 'native-base'
import images from '../../../assets/images'
import DeliveryGuyIcon from '../../../assets/icons/DeliveryGuyIcon';
import { Colors } from '../../../constants';
import { withAppContext, IAppContext, IOrder, mockOrder } from '../../../AppContext';
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import BagIcon from '../../../assets/icons/BagIcon'
import OnlineIcon from '../../../assets/icons/OnlineIcon'
import OfflineIcon from '../../../assets/icons/OfflineIcon'
import LocationIcon from '../../../assets/icons/LocationIcon';
import DriverConfirmIcon from '../../../assets/icons/DriverConfirmIcon';
import { database } from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import Inactive from  '../../../components/Inactive'
import ConfirmItems from '../OrderProgress/ConfirmItems';

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
  }

type IProps = IAppContext & StackNavigationProp;

interface IState {
  isModalVisible: boolean;
  isOnline?: boolean;
  isVacant?: boolean;
  isActive?: boolean;
  newState : "pending"| "shopping" | "confirmed" | "collected" | "delivered" ; 
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
        order : null
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
      this.onChildAdded = database()
        .ref('/orders')
        .on('child_added', async (snapshot: { val: () => any; key: any; }) => {
          const order = snapshot.val()
          const orderId = snapshot.key
          const {status , driver } = order

          console.log({status})
          
          if(status === "pending" && driver && driver.id === phoneNumber){ //and I'm the driver

            this.setState({newState : "pending"})
            playSound()
            this.recordNewOrderOfFocus(order, orderId)
            
            //listen to order updates
            this.onOrderUpdated = database()
            .ref(`/orders/${orderId}`)
            .on('value', (snapshot: { val: () => any; key: any; }) => {
              const order = snapshot.val()
              if(order){
                setOrder(order)
              }         
            })
          }    
      })        

      this.onDriverUpdated = database()
        .ref(`/users/${phoneNumber}`)
        .on('value', (snapshot: { val: () => any; key: any; }) => {
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

    changeOrderProgress = (newState : "pending" | "shopping" | "shopping" | "collected" | "confirmed" | "delivered") => { 
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
        <View style={{flexDirection : "row", height: 56, width : "100%",alignItems : "center"}}>
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
        const isShopping = orderType === "Shopping"
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

    renderPaymmentMethod = (cashPayment : boolean) => {
      return (
        <>
          <View style={styles.paymentMethod}>
              <Text style={{fontWeight : "bold", fontSize :12, color : "green" }} >{cashPayment || true ? "Cash Payement" : "Card Payment"}</Text>
          </View>
          {cashPayment && <Text style={{fontSize : 8, color : "red", marginTop: 8}}>*Please remember to collect cash upon deliver</Text> }
        </>
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

      const {order : {total , paymentMethod , distance , customer}} = this.state
      const {context : {currentUser :{ displayName, profilePicURL}, updateDriverStatus, sendRequest,setRatingsVisible, setUserInRating}} = this.props

      return(
        <View style={styles.modalInnerContainer}>
          <View style={[styles.newReqContainer, {height : 430}]}>
            {this.renderCustomerCard()}
            <View style={{ height: 100, justifyContent :"flex-start", alignItems : "center", backgroundColor : "#fff",paddingTop : 24 }}>
              <DriverConfirmIcon/>
              <Text style={{alignSelf : "center" ,fontSize : 18, color : Colors.overlayDark80}}> Trip Complete </Text> 
              <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30 ,fontSize : 12}]} >Amount due </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4, fontSize : 11, fontWeight : "bold" }]} >
                {`N${total}`}
              </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30, fontSize :12}]}>Distance Travelled </Text>
              <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4,marginBottom : 16,fontSize : 11, fontWeight : "bold" }]}> 
                {`${distance} km`} 
              </Text>
              {this.renderPaymmentMethod(paymentMethod == "cash")}            
              <View style={styles.addressesWrapper}>               
              </View>
            </View>

            <View style={[styles.bottomBtnswrapper,{flexDirection : "column",alignItems : "center" } ]}>
              <Btn onPress={()=>{
                  updateDriverStatus({isVacant : true})
                  this.setState({isModalVisible : false})

                  setUserInRating(customer)
                  setRatingsVisible(true)
                }} 
                style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange ,width : 192}]} >
                <Text  style={styles.acceptDeclineText} > Done </Text>
              </Btn>

            </View>
          </View>
        </View>
      )
    }

    renderInactiveModal = () =>{
        const { isActive } = this.state
        return(
          <Inactive isActive={isActive} />
        )
    }

    renderNewOrderModal = () => {

      const {isModalVisible , newState,} = this.state
      return(
        <Modal 
          animated
          key="mod"
          transparent
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          {newState === "pending" ? 
            this.renderNewRequestDecision() : 
            ["confirmed", "collected"].includes(newState) ? this.renderOrderInProgress():
            this.renderDeliveredOrder()
          }
        </Modal>
      )
    }
  
    toggleOnline = (isOnline : boolean) => {
      const {context : {updateDriverStatus , currentUser : {phoneNumber} }} = this.props

      updateDriverStatus({isOnline})
      if (isOnline){
        updateDriverStatus({isVacant : true})
      }
 
    }

    render(){
      const {context : {currentUser :{ displayName, profilePicURL}, sendRequest,setRatingsVisible, setUserInRating}} = this.props
      const {isOnline , newState} = this.state
      const imgSrc =  profilePicURL ? {uri : profilePicURL} : images.headShot
      const randomNum =  Math.floor(Math.random() * Math.floor(1000))
      const testUser = {
        phoneNumber : "+27662359664",
        displayName : "Mnotho test user"
      }


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
                      setUserInRating(testUser)
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


const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    switchWrapper : {
      flexDirection : "row", justifyContent: "flex-end",
      width : "100%" , alignItems : "center",
      paddingHorizontal : 24 ,position: "absolute",
      top :24
    },
    displayName : {
      fontSize : 20, fontWeight : "700", 
      color : "#fff",alignSelf : "flex-start" 
    },
    topHeaderWrapper : {
      width : "100%",justifyContent:"flex-end",
      alignItems : "flex-start",height: "35%",
      paddingHorizontal : 24,paddingBottom : 32
    },
    displayPic : {
      borderRadius : 20 , height : 40,
      width:  40
    },
    imgWrapper : {
      width : 40,height: 40, 
      borderRadius : 20,backgroundColor : "grey", 
      borderWidth : 0.75, borderColor : "#fff",marginBottom : 12
    },
    switchLabel : {
      fontSize : 16, fontWeight : "bold",
      marginRight : 16 
    },
    welcomeText : {
      fontSize : 16, fontWeight : "400",
      color : "#fff",alignSelf : "flex-start" 
    },
    routeSummaryRow :{ 
      height: 122,flexDirection : "row", 
      alignItems : "center", justifyContent :"flex-start",
      paddingVertical : 8 
    },
    addMockOrder : {
      width : 120,height:46 ,
      justifyContent : "center" , alignItems : "center",
      backgroundColor : Colors.primaryOrange , 
      borderRadius :3
    },
    newReqInnerContainer : { 
      height: 70, flexDirection : "row", 
      justifyContent :"flex-start",
      backgroundColor : "#fff",
      paddingVertical : 8 
    },
    bottom : { 
      padding : 24, backgroundColor : "#fff",
      width : "100%", height : "65%", ...shadow , 
      alignItems : "center",justifyContent : "center",
      position : "absolute", bottom : 0, borderTopLeftRadius : 24, 
      borderTopRightRadius: 24
    },
    onOffText:{
      alignSelf : "center",
      textAlign : "center",
      color : "#878787",
      marginVertical : 8,
    },
    serviceDescriptionText: {
      marginVertical :  8,textAlign  :"center",
      fontSize : 12 , color : "#878787" 
    },
    acceptDeclineText : {
      fontSize : 14,
      fontWeight : "bold",
      color : "#fff"
    },
    incomingText : {
      alignSelf : "center", 
      textAlign : "center", 
      fontSize : 16 , fontWeight : "bold",
      color : "red" 
    },
    customerHeader : {
      fontSize : 11,
      color : "#878787",
    },
    paymentMethod : { 
      borderWidth : 1.25 , borderColor : "green", 
      width : 100,height:24,marginVertical:2,
      alignItems : "center",borderRadius : 3, 
      justifyContent : "center" 
    },
    newReqContainer : {
      width : "100%" , minHeight : 400, maxHeight : 560,
      borderRadius : 3, backgroundColor : "#fff",
      paddingTop: 12, paddingHorizontal : 24
    },
    bottomBtnswrapper : { 
      height : 64, width : "100%" ,position : "absolute", 
      bottom : 4 ,paddingHorizontal : 16,
      flexDirection : "row", justifyContent :"center", 
      alignSelf : "center"
    },
    path : { 
      width:1,height:32,borderRadius:4,
      backgroundColor :"rgba(0,0,0,0.5)"
    },
    pickupIconInner : { 
      width:8,height:8,borderRadius:4,
      backgroundColor :"#000" 
    },
    pickupIconOutter : { 
      width:14,height:14,
      justifyContent : "center",alignItems : "center",
      borderRadius: 7, borderWidth : 1,
      backgroundColor : "#fff", 
      borderColor :"#000" 
    },
    routePath : {
      width:  14,marginRight : 8,
      justifyContent:"space-between",
      paddingVertical:10 ,
      alignItems: "center"
    },
    modalInnerContainer : { 
      width : "100%",height: "100%",
      paddingHorizontal : 16, backgroundColor : "rgba(0,0,0,0.3)", 
      justifyContent: "center",paddingBottom : 46
    },
    container: {
      flex : 1 , width : "100%", height : "100%",
      backgroundColor : "#FEFEFE", 
      alignItems : "center"
    },
    addressesWrapper : {flex : 1, height : 122, justifyContent : "space-evenly"},
    inputWrapper :{ 
      width: "100%" , height : 54 , borderColor : Colors.primaryOrange ,
      borderWidth : 1,borderRadius : 8,justifyContent : "space-between" ,
      flexDirection : "row",alignItems : "center"
    },
    btnStyle:{ 
          height: 46,borderRadius: 4, backgroundColor :"#EDF4F9",width : 150,
          alignItems : "center",justifyContent : "center",paddingHorizontal : 24 
    },
    tabStyle : {backgroundColor : 'white'},
    orderSummary: {
      marginTop : 46, height: 180,
      width: "88%",borderRadius: 3, 
      justifyContent : "space-between", backgroundColor : "#fff", 
      padding : 24
    },
    addressInputWrapper: { 
      height : 38, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
      fontSize :  10,
    },
    textAreaStyles:{
      height : 56, borderRadius : 2,
      borderWidth : 1, borderColor: "#f9f9f9",paddingVertical:2,
      paddingHorizontal : 12, justifyContent : "center" 
    },
  
  })

