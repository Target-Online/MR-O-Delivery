import React, { Component} from 'react'
import { View, Text , StyleSheet , Dimensions} from 'react-native'
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import ParcelDelivered from '../../../assets/icons/ParcelDelivered'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import StepIndicator from 'react-native-step-indicator';
import firebase from 'firebase'
import UserCard from '../../../components/UserCard'
import { styles } from './styles'
import Points from 'screens/driver/OrderProgress/Points'
import strings from 'constants/strings'
import { OrderState } from 'types'

type IProps = IContextProps & StackScreenProps<{navigation : any}> ;

class Payment extends Component<IProps> {
    constructor (props) { super(props) }

    componentDidMount(){
        const {context : {order,setOrder,setRatingsVisible, setUserInRating }} = this.props
        const {orderId} = order
        firebase.database().ref(`orders/${orderId}`).on('value', function(snapshot) {
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

    getStepText = (orderStatus : OrderState ) => {
        const {context : {order : {driver : {displayName}} }} = this.props
        const progressCopy  = {                              
            "delivered" : strings.parcelDelivered,
            "collected" : strings.parcelCollected,
            "confirmed" : strings.orderConfirmed,
            "pending" :  strings.waitingForDriver,
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
                onBackPress={()=> { this.props.navigation.navigate("Home")}}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1}}>
                    <View style={{alignItems : "center", backgroundColor : "white"}}>
                        <View style={styles.top} >
                            <View style={styles.orderDetailsHead}>
                                <Text style={styles.orderTrackHead}>{strings.trackingNo}</Text>
                                <Text style={styles.trackingId}> {orderId}</Text>
                            </View>
                            <View style={styles.step}>
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

                        <View style={styles.routesSummary}>
                            <View style={{height : 60, flexDirection : "row" , justifyContent :"center" }}>
                                <Points/>

                                <View style={{flex:1, height: 70,justifyContent  :"space-between" }}> 
                                    <View style={styles.textAreaStyles} >
                                        <Text style={styles.addressInput} >
                                            {pickUpAddress.description}
                                        </Text>                                                          
                                    </View>
                                    <View style={styles.textAreaStyles} >
                                        <Text style={styles.addressInput} >
                                            {dropOffAddress.description}
                                        </Text>   
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

export default withAppContext(Payment)