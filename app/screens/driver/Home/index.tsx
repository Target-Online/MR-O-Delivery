
import React from 'react';
import {
  Modal,StyleSheet,TouchableOpacity as Btn,View,Image as RnImg,
  Text,StatusBar, Dimensions, ImageBackground, TextInput} from 'react-native';
import { Container,Button, Header, Tab, Tabs, Switch } from 'native-base'
import images from '../../../assets/images'
import Icon from 'react-native-vector-icons/EvilIcons'
import BikeIcon from '../../../assets/icons/BikeIcon';
import DeliveryGuyIcon from '../../../assets/icons/DeliveryGuyIcon';
import { Colors } from '../../../constants';
import { withAppContext, IAppContext, IOrder } from '../../../AppContext';
import { RouteSummary } from '../../user/Payment';
import LocationIcon from '../../../assets/icons/LocationIcon';
import { database } from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';

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
  isOnline : boolean;
  newRequestStep : "pending" | "inProgress" | "delivered" ; 
  order?: IOrder;
  orderId?: string;
}

class Home extends React.Component<IProps, IState> {

    onChildAdded: (a: import("firebase").RNFirebase.database.DataSnapshot | null, b?: string | undefined) => import("firebase").RNFirebase.database.QuerySuccessCallback;

    constructor(props){
      super(props)
      this.onChildAdded = database()
        .ref('/orders')
        .on('child_added', snapshot => {

          const order = snapshot.val()
          const orderId = snapshot.key
          const {status} = order

          if(status === "pending"){ //and I'm the driver

            this.recordNewOrderOfFocus(order, orderId )

          }    
      })

      this.state = {
        isModalVisible : false,
        isOnline : true,
        newRequestStep : "pending",
        order : undefined
      }
    }

    recordNewOrderOfFocus = (newOrder : IOrder , orderId : string) =>{
      
      const {context : {order}} = this.props
      this.setMyOrder(newOrder)
      this.setState({isModalVisible : true, order: newOrder, orderId })

    }



    componentWillMount = async () => {

      const {context : {profile :{firstname}, user : {_user : {email}} ,fetchUserProfile, getAllDrivers } } = this.props
      let userFetch = await  fetchUserProfile(email)
      getAllDrivers()

    }

    setMyOrder = (theOrder : IOrder) => {
      const {context : {setOrder,order}} = this.props
      setOrder(theOrder)
    }

    componentWillUnmount = () => {
      database()
        .ref('/orders')
        .off('child_added', this.onChildAdded );

    }

    closeModal = () =>{
      this.setState({isModalVisible : false})
    }

    changeOrderProgress = (newRequestStep : "pending" | "inProgress" | "delivered") => { 
      const { order,orderId } = this.state
      const { context : {updateOrderStatus } } = this.props
      this.setState({newRequestStep})
      const updatedOrder = {...order, status : newRequestStep}
      updateOrderStatus(orderId,updatedOrder)
    }

    renderCustomerCard = () => {

      const {context : {order}} = this.props
      const {firstname} = order.customer || {}
     

      return(
        <View style={{borderBottomWidth : 0.75 , borderBottomColor : Colors.overlayDark10,flexDirection : "row" , height : 74, alignItems : "center", width: "100%"}} >  
          <View style={{width : 50, height : 50, borderRadius : 4, backgroundColor : Colors.overlayDark10 ,marginRight: 12}} />
          <View style={{height : "100%",width : "100%",justifyContent : "center"}}>
     
              <Text>{firstname}</Text>
              <Text>Estimate - 2.5 km 
              <Text style={[styles.activeTextStyle,{marginLeft : 16}]} > Payment</Text>
              </Text>

          </View>
        </View>
      )
    }

    renderNewRequestDecision = () => {

      const { order } = this.state


      if(order){

        const {pickUpAddress, dropOffAddress} = order || { pickUpAddress : {}, dropOffAddress : {} }

        return(
          <View style={styles.modalInnerContainer}>
            <View style={styles.newReqContainer}>
              {this.renderCustomerCard()}
              <View style={{ height: 70, flexDirection : "row", justifyContent :"flex-start",backgroundColor : "#fff",paddingVertical : 8 }}> 
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
                          <Text style={[styles.addressInput,{fontSize :12, color : "grey"}]} >Pickup</Text>
                          <Text numberOfLines={2} style={styles.addressInput} >
                              {pickUpAddress.address}
                          </Text>    
                      </View>
                      <View style={styles.textAreaStyles} >
                          <Text style={[styles.addressInput,{fontSize :12, color : "grey"}]} >Drop-Off</Text>
                          <Text numberOfLines={2} style={styles.addressInput} >
                            {dropOffAddress.address}
                          </Text>   
                      </View>
                  </View>
                </View>

            </View>

            <View style={styles.bottomBtnswrapper}>

              <Btn style={[styles.btnStyle ]}>
                <Text style={[styles.acceptDeclineText,{color : Colors.overlayDark70}]} > Decline </Text>
              </Btn>

              <Btn 
                onPress={()=> this.changeOrderProgress("inProgress")} 
                style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange}]} 
              >
                <Text  style={styles.acceptDeclineText} > Accept </Text>
              </Btn>

            </View>
          </View>
        )
      }

      return null
    }

    renderOrderInProgress = () =>{

      return(
      <View style={styles.modalInnerContainer}>
         <View style={styles.newReqContainer}>
           {this.renderCustomerCard()}
           <Text style={{alignSelf : "center" , marginVertical : 4}} > On Route...</Text>
          <View style={{ height: 70, flexDirection : "row", justifyContent :"flex-start",backgroundColor : "#fff",paddingVertical : 8 }}> 
              
              <View style={[styles.routePath,{height : 42} ]}>
                
                <View style={{width:8,height:8,alignItems : "center" }} >
                  <LocationIcon width={12} height={12} />
                </View>
              </View>
              <View style={[styles.addressesWrapper,{height : 42}]}>
                 
                  <View style={styles.textAreaStyles} >
                      <Text style={[styles.addressInput,{fontSize :12, color : "grey"}]} >Drop-Off</Text>
                      <Text numberOfLines={2} style={styles.addressInput} >
                        {"drop-off Address 1"}
                      </Text>   
                  </View>
              </View>
            </View>

        </View>

          <View style={[styles.bottomBtnswrapper,{flexDirection : "column",height : 100,bottom : 64,alignItems : "center" } ]}>

          <Btn style={[styles.btnStyle , { backgroundColor : "#fff", borderWidth : 1 , borderColor : Colors.overlayDark70 ,width : 192} ]}>
            <Text style={[styles.acceptDeclineText,{color : Colors.overlayDark70, }]} > Get Directions </Text>
          </Btn>

          <Btn onPress={()=>{ this.changeOrderProgress("delivered")}} style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange, width : 192 }]} >
            <Text  style={styles.acceptDeclineText} > Drop-Off </Text>
          </Btn>

        </View>
      </View>
      )
    }

    renderPaymmentMethod = (cashPayment : boolean) => {
      return (
        <>
          <View style={styles.paymentMethod}>
              <Text style={{fontWeight : "bold", fontSize :12, color : "green" }} >{cashPayment ? "Cash Payement" : "Card Payment"}</Text>
          </View>
          {cashPayment && <Text style={{fontSize : 8, color : "red", marginTop: 8}}>*Please remember to collect cash upon deliver</Text> }
        </>
      )
    }


    renderDeliveredOrder = () =>{

      return(
      <View style={[styles.modalInnerContainer ]  }>
        <View style={[styles.newReqContainer, {height : 400}]}>
          {this.renderCustomerCard()}
          <View style={{ height: 100, justifyContent :"flex-start", alignItems : "center", backgroundColor : "#fff",paddingTop : 36 }}>  


           <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30}]} >Amount due </Text>
            <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4, fontSize : 16, fontWeight : "bold" }]} >
               N1250 
            </Text>
            <Text style={[styles.activeTextStyle, {color : Colors.overlayDark30}]}>Distance Travelled </Text>
            <Text style={[styles.activeTextStyle, {color : Colors.primaryOrange,marginVertical: 4,marginBottom : 16,fontSize : 16, fontWeight : "bold" }]}> 
              2.5 km
            </Text>
            
            {this.renderPaymmentMethod(true)}

              
            <View style={styles.addressesWrapper}>
                
            </View>
          </View>

        </View>

        <View style={[styles.bottomBtnswrapper,{flexDirection : "column",alignItems : "center" } ]}>



          <Btn onPress={()=>{
              this.setState({isModalVisible : false})
            }} 
            style={[styles.btnStyle, {backgroundColor : Colors.primaryOrange ,width : 192}]} >
            <Text  style={styles.acceptDeclineText} > Done </Text>
          </Btn>

        </View>
      </View>)
    }


    renderNewOrderModal = () => {

      const {isModalVisible , newRequestStep} = this.state
      return(
        <Modal 
          animated
          key="mod"
          transparent
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={()=> this.closeModal()}
        >
          {newRequestStep === "pending" ? 
            this.renderNewRequestDecision() : 
            newRequestStep === "inProgress" ? this.renderOrderInProgress():
            this.renderDeliveredOrder()
          }
        </Modal>
      )
    }
  
    openModal(authType : string){
        this.setState({authType, isModalVisible : true})
    }

    toggleOnline = () =>{
      const {isOnline} = this.state
      this.setState({isOnline : !isOnline})
    }

    render(){

      const {context : {profile :{firstname}, user ,sendRequest}} = this.props
      const {isOnline} = this.state

      return [
          this.renderNewOrderModal(),      
            <View key="main" style={styles.container} >
            <StatusBar barStyle="dark-content" />    
            <ImageBackground source={images.homeBg} style={{width : "100%", height : "100%"}}>

              <View style={{width : "100%",justifyContent:"flex-end" ,alignItems : "flex-start",height: "35%",paddingHorizontal : 24,paddingBottom : 32}}>
                <View style={{position: "absolute", bottom : 24,right:12}}>
                  <DeliveryGuyIcon />
                </View>
                  <Btn
                      onPress={()=> { this.openModal("DriversignIn") }}
                  >
                    <View
                    style={{width : 40,height: 40, borderRadius : 20,backgroundColor : "grey", borderWidth : 0.75, borderColor : "#fff",marginBottom : 12}}
                    >                 
                      <RnImg style={{borderRadius : 20 , height : 40, width:  40}} resizeMode="cover" source={images.headShot} />
                    </View>
                  </Btn>

                <Text style={{fontSize : 16, fontWeight : "400", color : "#fff",alignSelf : "flex-start" }} >
                  Welcome Back,               
                </Text>
                <Text style={{fontSize : 20, fontWeight : "700", color : "#fff",alignSelf : "flex-start" }} >
                    {firstname}
                </Text>
                </View>
              </ImageBackground>
          
            <View style={{ padding : 24, backgroundColor : "#fff",width : "100%", height : "65%", ...shadow , alignItems : "center",justifyContent : "space-between", position : "absolute", bottom : 0, borderTopLeftRadius : 24, borderTopRightRadius: 24}} >
                
                  <View style={{flexDirection : "row", justifyContent: "flex-end",width : "100%" , alignItems : "center" ,paddingHorizontal : 24}} >
                    <Text style={{fontSize : 16, fontWeight : "bold",marginRight : 4 }} >
                     {isOnline ? "Online" : "Offline"}
                    </Text>
                  
                    <Switch onValueChange={this.toggleOnline} value={isOnline} style={{width : 24,  }} />
                  </View>

                  <Btn
                    style={{width : 120,height:46 , justifyContent : "center" , alignItems : "center", backgroundColor : Colors.primaryOrange , borderRadius :3}}

                    onPress={()=>{
                          sendRequest(`some${randomNum}order${randomNum}`,()=>{},()=>{} )
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



const randomNum =  Math.floor(Math.random() * Math.floor(100));

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    serviceDescriptionText: {
      marginVertical :  8,textAlign  :"center", fontSize : 12 , color : "#878787" 
    },
    acceptDeclineText : {
      fontSize : 14,
      fontWeight : "bold",
      color : "#fff"
    },
    paymentMethod : { 
      borderWidth : 1.25 , borderColor : "green", 
      width : 100,height:24,marginVertical:2,
      alignItems : "center",borderRadius : 3, 
      justifyContent : "center" 
    },
    newReqContainer : {
      width : "100%" , minHeight : 300, maxHeight : 400,
      borderRadius : 3, backgroundColor : "#fff",
      paddingTop: 12, paddingHorizontal : 24
    },
    bottomBtnswrapper : { 
      height : 64, width : "100%" ,position : "absolute", 
      bottom : 56 ,paddingHorizontal : 16,
      flexDirection : "row", justifyContent :"space-between", 
      alignSelf : "center"
    },
    path : { 
      width:1,height:24,borderRadius:4,
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
      justifyContent: "flex-end",paddingBottom : 46
    },
    container: {
      flex : 1 , width : "100%", height : "100%",
      backgroundColor : "#FEFEFE", 
      alignItems : "center"
    },
    addressesWrapper : {flex : 1, height : 84, justifyContent : "space-between"},
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
      fontSize :  12, 
    },
    textAreaStyles:{
      flex : 1, height : 32, borderRadius : 2,
      borderWidth : 1, borderColor: "#f9f9f9", 
      paddingHorizontal : 16, justifyContent : "center" 
    },
  
  })

