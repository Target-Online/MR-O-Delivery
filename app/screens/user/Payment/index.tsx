import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, ScrollView, StyleSheet} from 'react-native'
import VerifiedIcon from '../../../assets/icons/VerfiedIcon'
import MastercardIcon from '../../../assets/icons/MastercardIcon'
import CashIcon from '../../../assets/icons/CashIcon'
import Icon from 'react-native-vector-icons/EvilIcons'
import EFTIcon from '../../../assets/icons/EFTIcon'
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import { withAppContext, IContextProps, IAddress } from '../../../AppContext'
import BackScreen from '../../../layouts/BackScreen'
import Loader from '../../../components/loader'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getDistance, getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'
import RouteSummary from '../../../components/RouteSummary'
import { showNoDriversAlert } from  '../../../utils/orderModules'

type IProps = IContextProps &
StackScreenProps<{navigation : any}>

class Payment extends Component<IProps> {
    constructor (props: any) {
      super(props)
    }

    state = {
        paymentMethod : "Cash",
        loaderVisible : false
    }

    renderPayTypeOption = (opt : any) => {
        const {paymentMethod} = this.state
        const selected = opt.label === paymentMethod
        return(
            <Btn 
                onPress={()=>{
                    this.setState({paymentMethod : opt.label})
                }} 
                style={{height: 82,width:  108, alignItems : "center"}}
            >
                <View style={{width: 108, height :  60}}>
                    <View style={{width : 100, height: 50, borderColor : selected? "#20d86d" : "rgba(0,0,0,0.09)", borderWidth : 1, position : "absolute", top: 8,justifyContent:"center" }}>
                        {opt.icon}
                    </View>
                    {selected && 
                        <View style={{width : 16,height:16, borderRadius : 8 ,backgroundColor : "transparent",alignSelf : "flex-end",marginRight :4}} >
                            <VerifiedIcon />
                        </View>}
                </View>
                <Text style={{marginRight : 12}} >{opt.label}</Text>
            </Btn>
        )
    }

    renderLoader(){
        const {loaderVisible} = this.state
        return(
            <Loader visible={loaderVisible === true} button={{text : "Cancel" , onPress :()=>{}}} text={"Requesting a driver"} />
    )}

    renderCardOption(){
        const  cards = [1,1,1]

        return(
        <View style={{width : "100%", minHeight : 100,alignItems : "center"}}>
            {cards.map((c, index) =>(
                <Btn style={{width : 300, height : 42 , borderRadius : 4, paddingHorizontal : 24, marginTop : 12,flexDirection : "row",
                        borderColor : index !== 1? "rgba(0,0,0,0.1)" :  "#F57301", borderWidth : 1, backgroundColor : "#fff" , alignItems : "center", justifyContent : "space-between" }}>
                        <Text style={{fontSize :  13 ,color : "#333333" , fontWeight : "600", }}>
                            •••• •••• •••• 1234
                        </Text>
                        <Icon name="plus" color={"rgba(0,0,0,0.0)"} size={16} />
                </Btn>
            ))}
            <Btn style={{width : 300, height : 42 , borderRadius : 4, paddingHorizontal : 24, marginTop : 12,flexDirection : "row",
                      borderColor : "rgba(0,0,0,0.1)", borderWidth : 1, backgroundColor : "#fff" , alignItems : "center", justifyContent : "space-between" }}>

                          <Icon name="plus"  size={24} />
                    <Text style={{fontSize :  13 ,color : "#333333" , fontWeight : "600", }}>
                      Add Card
                    </Text>
                    <Icon name="plus" color={"rgba(0,0,0,0.0)"} size={16} />
            </Btn>
        </View>
        )
    }

    renderCashOption(){
        const {context : {profile , order,setOrder}} = this.props
        const orderTotal = this.getOrderTotal()
        return(
            <View style={{width : "100%", minHeight : 100, justifyContent : "center", alignItems : "center" ,paddingHorizontal : 24}}>
                <Text style={styles.cashDeliveryNote}> The driver will collect a total of 
                    <Text style={[styles.cashDeliveryNote, {color : "red"}]}>{` N${orderTotal}`}</Text> on delivery.</Text>
                <Text style={styles.cashDeliveryNote} >Please make sure you make the right change with you.</Text>                  
            </View>
        )
    }

    getTotalDistance = (pickUp: GeolibInputCoordinates, dropOff: GeolibInputCoordinates) =>{
        var dis = getPreciseDistance(pickUp,dropOff)+ 300 //distance off by 200 metres
        return (dis)/1000
    }

    getOrderTotal = () => {
        const {context : {order}} = this.props
        const {dropOffAddress , pickUpAddress , items, total}  = order
        const distance = this.getTotalDistance(this.convertLocation(pickUpAddress.geometry.location) ,
        this.convertLocation(dropOffAddress.geometry.location))
        const orderTotal = 500 + distance * 200
        return Math.round(orderTotal)
    }

    showNoDriversAlert = () => {
        const {context : {setAlertData , setShowAlert}} = this.props
        setAlertData({
            text: "Looks like all our drivers are busy at the moment",
            buttons : [  {label : "Try Again",onPress : () => { }} , {label : "Cancel",onPress : ()=>{}} ],
            title : "Oops",})
        setShowAlert(true)
    }
  
    processRequest = () => {

        if(this.props.context){
            const {context : {sendRequest , order,setOrder, users}} = this.props
            const {paymentMethod} = this.state
            const {dropOffAddress , pickUpAddress , items, total}  = order
            this.setState({loaderVisible : true})
            const freeDrivers = users.data.filter((user: { isActive: any, isDriver : boolean, isVacant : boolean, isOnline : boolean,  }) =>  user.isDriver && user.isActive && user.isOnline && user.isVacant )
            const distance = this.getTotalDistance(this.convertLocation(pickUpAddress.geometry.location),
            this.convertLocation(dropOffAddress.geometry.location))
            const orderTotal = this.getOrderTotal()

            if (freeDrivers[0]){
                let myOrder  = {...order, total : orderTotal,distance,paymentMethod }
                const {orderId} = myOrder
                myOrder.driver = freeDrivers[0]
                setOrder(myOrder)
                sendRequest(orderId, myOrder, ()=>{
                    setTimeout(()=> {
                        this.setState({loaderVisible : false})
                        this.props.navigation.navigate('OrderProgress')
                    },2000)
                }, ()=>{})
            }
            
            else{
                setTimeout(()=>{ this.setState({loaderVisible : false})},1000) 
                setTimeout(()=>{ showNoDriversAlert(this.props.context) },1000) 
            }
        }
    }

    convertLocation = (location : {lat: string, lng:string}) => ({ latitude : location.lat, longitude : location.lng})

    confirmOrder = () =>{
        const {context : {updateOrderStatus, order}} = this.props
        updateOrderStatus(order.orderId, {...order, orderConfirmed : true})
    }

    render () {
        const { paymentMethod } = this.state
        const paymentMethods = [ {label : "Cash",icon : <CashIcon /> }]
        const {context : {profile , order,setOrder}} = this.props
        const {dropOffAddress , pickUpAddress , items, orderType, total}  = order
        const {name , description } = items[0]
        const shopping = orderType === "Shopping"
      return ( 
        <BackScreen
            title="Payment"
            scroll={false}
            navigation={this.props.navigation}
            onBackPress={()=> { this.props.navigation.goBack() }}
        >
            {this.renderLoader()}
            <View style={{alignItems : "center" }}>
                <View style={{width : "100%", height:  120,backgroundColor: "#F57301",opacity : 0.8, position : "absolute", top : 0}} />           
                <RouteSummary item={name}  pickUpAddress={pickUpAddress} dropOffAddress={dropOffAddress} />
            </View>
            <ScrollView style={{flex : 1,paddingBottom : 40}} contentContainerStyle={{alignItems : "center" ,marginBottom : 40}} >
                <View style={{ flexDirection : "row", padding : 24,marginTop : 4,  justifyContent: 'center', alignItems : 'center',width : '100%', height : 90 }}>
                    {paymentMethods.map((opt, index)=> this.renderPayTypeOption(opt))}
                </View>

                {paymentMethod === "Card" ? this.renderCardOption() : this.renderCashOption()}

                <Btn 
                onPress={()=>{
                    this.confirmOrder()
                    shopping ? this.props.navigation.navigate('OrderProgress') :
                    this.processRequest()
                 }} 
                style={styles.proceedBtn} >
                <Text style={{fontSize :  13 ,color : "#fff" , fontWeight : "800"}}>
                    Proceed
                </Text>
            </Btn>
            </ScrollView>
        </BackScreen> 
      )
    }
}

export default withAppContext(Payment)

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
}

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    proceedBtn: { 
        width : 300, height : 42 , borderRadius : 4, marginTop : 12,
        backgroundColor : "#F57301",alignItems : "center", 
        justifyContent : "center",alignSelf : "center" 
    },
    orderSummary: {
        marginTop : 24, height: 180,
        width: "88%",borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24
    },
    cashDeliveryNote :{
        fontSize : 12,
        marginVertical : 4,
        textAlign : "center"
    },
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    addressResultsItem : { 
      height :  54, borderBottomColor : "rgba(0,0,0,0.09)", 
      borderBottomWidth :  0.5, flexDirection : "row",
      alignItems : "center",
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
      height : 36, borderRadius : 2,paddingVertical : 4,
      borderWidth : 1, borderColor: "#f9f9f9", 
      paddingHorizontal : 16, justifyContent : "center" 
    },
    container: {
      flex : 1 ,
      paddingTop : 42,
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      alignItems : "center"
    },
    btnStyle:{ 
      width: 250, height: 86,
      borderRadius: 3, ...shadow,
      backgroundColor :"#fff",alignItems : "center",
      justifyContent : "flex-start", 
      flexDirection : "row",
      paddingHorizontal : 24 
    },
    tabStyle : {backgroundColor : 'white'}
  
  })

interface IAddressParams {
    dropOffAddress : IAddress  ,
    pickUpAddress : IAddress,
    item? : string;
    total?: string;
    isGroceries?: boolean;
}
