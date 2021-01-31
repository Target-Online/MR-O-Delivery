import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, ScrollView, StyleSheet} from 'react-native'
import VerifiedIcon from '../../../assets/icons/VerfiedIcon'
import CashIcon from '../../../assets/icons/CashIcon'
import Icon from 'react-native-vector-icons/EvilIcons'
import { withAppContext, IContextProps, IAddress } from '../../../AppContext'
import BackScreen from '../../../layouts/BackScreen'
import Loader from '../../../components/loader'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getDistance, getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'
import RouteSummary from '../../../components/RouteSummary'
import { showNoDriversAlert } from  '../../../utils/orderModules'
import { database } from 'firebase'
import strings from 'constants/strings'
import routes from 'constants/routes'

type IProps = IContextProps &
StackScreenProps<{navigation : any}>

class Payment extends Component<IProps> {
    onOrderUpdated: any
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
                    <View style={[styles.optionIcon,{ borderColor : selected? "#20d86d" : "rgba(0,0,0,0.09)",}]}>
                        {opt.icon}
                    </View>
                    {selected && 
                        <View style={styles.verified} >
                            <VerifiedIcon />
                        </View>}
                </View>
                <Text style={{marginRight : 12}} >{opt.label}</Text>
            </Btn>
        )
    }

    handleCancel = () => {
        const {context : {updateOrderStatus, order}} = this.props
        updateOrderStatus(order.orderId, {...order, status : "cancelled"})
        this.setState({loaderVisible : false})
    }

    renderLoader(){
        const {loaderVisible} = this.state
        return(
            <Loader visible={loaderVisible}  onCancel={()=> this.handleCancel()} text={"Requesting a driver"} />
        )
    }

    renderCardOption(){
        const  cards = [1,1,1]

        return(
        <View style={{width : "100%", minHeight : 100,alignItems : "center"}}>
            {cards.map((c, index) =>(
                <Btn style={[styles.cardOption, {borderColor : index !== 1? "rgba(0,0,0,0.1)" :  "#F57301"}, ]}>
                        <Text style={{fontSize :  13 ,color : "#333333" , fontWeight : "600", }}>
                            •••• •••• •••• 1234
                        </Text>
                        <Icon name="plus" color={"rgba(0,0,0,0.0)"} size={16} />
                </Btn>
            ))}
            <Btn style={styles.addACardButton}>

                <Icon name="plus"  size={24} />
                <Text style={styles.addCard}>
                    {strings.addCard}
                </Text>
                <Icon name="plus" color={"rgba(0,0,0,0.0)"} size={16} />
            </Btn>
        </View>
        )
    }

    renderCashOption(){
        const orderTotal = this.getOrderTotal()
        return(
            <View style={styles.cashOption}>
                <Text style={styles.cashDeliveryNote}> {strings.driverWillCollect}
                <Text style={[styles.cashDeliveryNote, {color : "red"}]}>{` N${orderTotal}`}</Text>{strings.onDelivery}</Text>
                <Text style={styles.cashDeliveryNote} >{strings.haveTheChange}</Text>                  
            </View>
        )
    }

    getTotalDistance = (pickUp: GeolibInputCoordinates, dropOff: GeolibInputCoordinates) => (getPreciseDistance(pickUp,dropOff)+ 300)/1000

    getOrderTotal = () => {
        const {context : {order}} = this.props
        const {dropOffAddress , pickUpAddress }  = order
        const distance = this.getTotalDistance(this.convertLocation(pickUpAddress.geometry.location) ,
        this.convertLocation(dropOffAddress.geometry.location))
        const orderTotal = 500 + distance * 200
        return Math.round(orderTotal)
    }

    showNoDriversAlert = () => {
        const {context : {setAlertData , setShowAlert}} = this.props
        setAlertData({
            text: strings.noDrivers,
            buttons : [  {label : "Try Again",onPress : () => { }} , {label : "Cancel",onPress : ()=>{}} ],
            title : strings.oops
        })
        setShowAlert(true)
    }
  
    processRequest = () => {

        if(this.props.context){
            const {context : {sendRequest , order,setOrder, users}} = this.props
            const {paymentMethod} = this.state
            const {dropOffAddress , pickUpAddress}  = order
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

                    this.onOrderUpdated = database()
                    .ref(`/orders/${orderId}`)
                    .on('value', (snapshot: { val: () => any; key: any; }) => {
                      const order = snapshot.val()
                      if(order){
                        if (order.status === "confirmed"){
                            setTimeout(()=> {
                              this.setState({loaderVisible : false})
                              this.props.navigation.navigate('OrderProgress')
                            },2000)
                        }    
                    }})}, ()=>{})
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
        const {context : {order}} = this.props
        const {dropOffAddress , pickUpAddress , items, orderType, total}  = order
        const {name } = items[0]
        const shopping = orderType === "Shopping"
        return ( 
            <BackScreen
                title="Payment"
                scroll={false}
                navigation={this.props.navigation}
                onBackPress={()=> { this.props.navigation.goBack()}}
            >
                {this.renderLoader()}
                <View style={{alignItems : "center"}}>
                    <View style={styles.routeSummaryPad} />           
                    <RouteSummary item={name}  pickUpAddress={pickUpAddress} dropOffAddress={dropOffAddress} />
                </View>
                <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} >
                    <View style={styles.paymentMethodsWrapper}>
                        {paymentMethods.map((opt, index)=> this.renderPayTypeOption(opt))}
                    </View>
                    {paymentMethod === "Card" ? this.renderCardOption() : this.renderCashOption()}
                    <Btn 
                        onPress={()=>{
                            this.confirmOrder()
                            shopping ? this.props.navigation.navigate(routes.ORDERPROGRESS) :
                            this.processRequest()
                        }} 
                        style={styles.proceedBtn} 
                    >
                    <Text style={styles.proceed}>
                        {strings.proceed}
                    </Text>
                </Btn>
                </ScrollView>
            </BackScreen> 
        )
    }
}

export default withAppContext(Payment)

