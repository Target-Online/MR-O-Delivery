import React, { Component} from 'react'
import { View, Text , Dimensions} from 'react-native'
import ParcelIcon from '@assets/icons/ParcelIcon'
import ParcelDelivered from '@assets/icons/ParcelDelivered'
import BackScreen from '@layouts/BackScreen'
import { IContextProps, withAppContext } from '@context/AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import StepIndicator from 'react-native-step-indicator';
import firebase from 'firebase'
import UserCard from '@components/UserCard'
import { withOrdersContext } from 'context/OrdersContext'
import styles , {customStyles} from "./styles"
import { OrderStatus } from 'src/types'
const  { height } = Dimensions.get('window')

type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;

class Payment extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {order,setOrder , setRatingsVisible, setUserInRating }} = this.props
        var ref = firebase.database().ref(`orders/${order.orderId}`);
        ref.on('value', function(snapshot) {
            const order = snapshot.val()
            if(order){ 
                setOrder(order) 
                const {status , driver , rated} = order
                if (status == "delivered" && !rated){
                    setUserInRating(driver)
                    setRatingsVisible(true)
                }
            
            }
        })
    }

    getStepText = (orderStatus : OrderStatus ) => {
        const {context : {order : {driver : {displayName}} }} = this.props
        const progressCopy  = {                              
            "delivered" : "Your parcel has been delivered.",
            "collected" : "Your parcel has been collected and trhe driver is on route to drop it off.",
            "confirmed" : "A driver has accepted your order and is  going to collect your parcel.",
            "pending" : "Waiting for drivers confirmation of your request.",
            "shopping": `${displayName} is getting your items.`     
        }
        return progressCopy[orderStatus]
    }

    render () {

        const {context : {  order }} = this.props
        const {dropOffAddress , pickUpAddress , orderType,status,  driver, orderId}  = order
        const isGroceries = orderType === "Shopping"
        const orderProgress = isGroceries ? ["pending", "confirmed", "shopping", "collected", "delivered"] : [ "pending", "confirmed" , "collected" , "delivered"]
        const labels = isGroceries ? ["Confirmation", "Shopping", "Items Collection" ,"On Route","Delivered"] : ["Confirmation", "Parcel Collection" ,"On Route","Delivered"]
        let currentStep = orderProgress.indexOf(status) 
        if (currentStep < 0) currentStep = 0

        return ( 
            <BackScreen 
                title={"Track Your Order"}
                onBackPress={()=> { this.props.navigation.navigate("Home") }}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1}}>
                    <View style={{alignItems : "center", backgroundColor : "white"}}>
                        <View style={styles.top} >
                            <View style={{height :  20 ,alignItems : "center"}}>
                                <Text style={styles.orderTrackHead}> Order Tracking Number : </Text>
                                <Text style={styles.trackingId}> {orderId}</Text>
                            </View>
                            <View style={{flex: 1 ,paddingHorizontal : 16, paddingTop : 46}}>
                                <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={currentStep}
                                    labels={labels}
                                    stepCount={isGroceries ? 5 : 4}
                                />
                                <View style={{ alignItems: 'center',paddingTop : 42 }}>
                                        {(currentStep > 2 ) ? <ParcelDelivered /> : <ParcelIcon width={80} height={80} /> }                                
                                        <Text style={styles.deliveryStep} >{this.getStepText(status)}</Text>
                                </View>                        
                            </View>
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <UserCard user={driver} />
                        <View style={{height: 150, padding : 16,width : "100%", justifyContent : "center" }}>
                            <View style={{height : 60, flexDirection : "row" , justifyContent :"center" }}>
                                <View style={styles.routeTrace}>
                                    <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
                                    <View style={{width:1,height:24,marginLeft : 3.5,borderRadius:4,backgroundColor :"grey" }} />
                                    <View style={{width:8,height:8,backgroundColor :"#000" }} />
                                </View>

                                <View style={{flex:1, height: 70,justifyContent  :"space-between" }}> 
                                    <View style={styles.textAreaStyles} >
                                        <Text style={styles.addressInput} >{pickUpAddress.description}</Text>                                                          
                                    </View>
                                    <View style={styles.textAreaStyles} >
                                        <Text style={styles.addressInput} >{dropOffAddress.description}</Text>   
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </BackScreen>
      )
    }
}

export default withAppContext(withOrdersContext(Payment))