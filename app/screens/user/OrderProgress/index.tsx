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
import UserCard from '../../../components/UserCard'
const  { height } = Dimensions.get('window')

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;

class Payment extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {order,setOrder , updateDriverStatus, sendRequest,setRatingsVisible, setUserInRating }} = this.props
        const {orderId} = order
        var ref = firebase.database().ref(`orders/${orderId}`);
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

    getStepText = (orderStatus : any ) => {
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
                onBackPress={()=> {
                    this.props.navigation.navigate("Home")  
                }}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1 , }}>
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

                <View style={{width : "100%", height : height - 340 ,backgroundColor : "#F57301",alignItems : "center" , flex : 1}}>
                    <UserCard user={driver} />

                    <View style={{height: 150, padding : 16,width : "100%", justifyContent : "center" }}>
                        <View style={{height : 60, flexDirection : "row" , justifyContent :"center" }}>
                            <View style={{width:  20,marginRight : 8,justifyContent:"space-between",paddingVertical:10 ,alignItems: "flex-start"}}>
                                <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
                                <View style={{width:1,height:24,marginLeft : 3.5,borderRadius:4,backgroundColor :"grey" }} />
                                <View style={{width:8,height:8,backgroundColor :"#000" }} />
                            </View>

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
    driverName:{
        color : '#fff',
        fontSize : 10,
    },
    top : {
        width : "100%", minHeight:  340,
        maxHeight: 400, flex : 1,
        paddingVertical : 24
    },
    orderTrackHead : {
        fontSize : 16,
        fontWeight : "bold",
    },
    trackingId : {
        height: 26 , borderColor :  "grey", 
        borderWidth : 1, borderRadius : 3,
        padding : 4, marginVertical : 8
    },
    deliveryStep :{
        alignItems : "center",
        textAlign:"center",
        marginTop : 16
    },
    contactBtn:{
        width : 50,
        height : 50,
        borderRadius : 25,
        backgroundColor: "#F57301",
        justifyContent : "center",
        alignItems : "center"
    },
    orderSummary: {
        marginTop : 4, height: 180,
        width: "88%",borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24
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
      flex : 1, height : 32, borderRadius : 2,
      paddingHorizontal : 16 
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
