import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet , Linking, Dimensions} from 'react-native'
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import ParcelDelivered from '../../../assets/icons/ParcelDelivered'
import images from '../../../assets/images'
import ChatIcon from '../../../assets/icons/ChatIcon'
import CallIcon from '../../../assets/icons/CallIcon'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import StepIndicator from 'react-native-step-indicator';
import firebase from 'firebase'
import {progressStyles as styles , customStyles} from "./styles"
import UserCard from '@components/UserCard'
import Points from './Points'

const  { height } = Dimensions.get('window')

const labels = ["Confirmation", "Parcel Collection" ,"On Route","Delivered"]


type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;
const orderProgress = [ "pending", "confirmed" , "collected" , "delivered"]

class Payment extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : { order,setOrder }} = this.props
        const {orderId} = order
        var ref = firebase.database().ref(`orders/${orderId}`);
        ref.on('value', function(snapshot) {
            if(snapshot.val()){
                const order = snapshot.val()
                setOrder(order)
            }
        });
    }

    render () {

        const {context : { order,setOrder, drivers, getAllDrivers}} = this.props
        const {dropOffAddress , pickUpAddress , items,status,  driver, orderId}  = order
        let currentStep = orderProgress.indexOf(status) 
        if (currentStep < 0) currentStep = 0
        return ( 
            <BackScreen 
                title={"Track Your Order"}
                onBackPress={()=> {
                    this.props.navigation.navigate("Home")
                }}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1 , }}>
                <View style={{alignItems : "center", backgroundColor : "white"}}>
                    <View style={{width : "100%", minHeight:  340, maxHeight: 400, flex : 1, paddingVertical : 24}} >

                        <View style={{height :  20 ,alignItems : "center"}}>
                            <Text style={styles.orderTrackHead}> Order Tracking Number : </Text>
                            <Text style={styles.trackingId}> {orderId}</Text>
                        </View>
                        <View style={{flex: 1 ,paddingHorizontal : 16, paddingTop : 46}}>
                            <StepIndicator
                                customStyles={customStyles}
                                currentPosition={currentStep}
                                labels={labels}
                                stepCount={4}
                            />
                             <View style={{ alignItems: 'center',paddingTop : 42 }}>
                                    {(currentStep > 2 ) ? <ParcelDelivered /> : <ParcelIcon width={80} height={80} /> }                                
                                    {(currentStep === 3) && <Text style={styles.deliveryStep} >Your parcel has been delivered</Text>}
                                    {(currentStep === 2) && <Text style={styles.deliveryStep} >Your parcel has been collected and trhe driver is on route to drop it off</Text>}
                                    {(currentStep === 1) && <Text style={styles.deliveryStep} >A driver has accepted your order and is  going to collect your parcel</Text>}
                                    {(currentStep < 1) && <Text style={styles.deliveryStep} >Waiting for drivers confirmation of your request</Text>}
                            </View>                        
                        </View>
                    </View>
                </View>

                <View style={{width : "100%", height : height - 340 ,backgroundColor : "#F57301",alignItems : "center" , flex : 1}}>
                    <UserCard user={driver} />
                    <View style={{height: 150, padding : 16,width : "100%", justifyContent : "center" }}>
                        <View style={{height : 60, flexDirection : "row" , justifyContent :"center" }}>
                            <Points />
                            <View style={{flex:1, height: 70,justifyContent  :"space-between" }}> 
                                <View style={styles.textAreaStyles} >
                                    <Text   style={styles.addressInput} >
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
