import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet} from 'react-native'
import VerifiedIcon from '../../../assets/icons/VerfiedIcon'
import MastercardIcon from '../../../assets/icons/MastercardIcon'
import CashIcon from '../../../assets/icons/CashIcon'
import Icon from 'react-native-vector-icons/Ionicons'
import EFTIcon from '../../../assets/icons/EFTIcon'
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import images from '../../../assets/images'
import ChatIcon from '../../../assets/icons/ChatIcon'
import CallIcon from '../../../assets/icons/CallIcon'
import MapView from 'react-native-maps';
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

type IProps = IContextProps &
StackScreenProps<{navigation : any}> ;


class Payment extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    render () {

        const {context : {sendRequest , order,setOrder, drivers, getAllDrivers}} = this.props
        const {dropOffAddress , pickUpAddress , items, driver, total}  = order
        const { displayName }  = driver
        return ( 
            <BackScreen 
                // scroll
                title={"Track Your Order"}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1}}>
                <View style={{alignItems : "center"}}>
                    <View style={{width : "100%", height:  340,}} >
                        {/* <MapView
                            style={{flex : 1}}
                            initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                            }}
                        /> */}

                        <View style={{flex: 1}}>
                            <ProgressSteps>
                                <ProgressStep label="Parcel pickup">
                                    <View style={{ alignItems: 'center' }}>

                                    <Text>{`${displayName} is ON THE WAY to PICK up your parcel`}</Text>
                                    </View>
                                </ProgressStep>
                                <ProgressStep label="En Route">
                                    <View style={{ alignItems: 'center' }}>
                                        
                                    <Text>{`${displayName} is ON THE WAY to deliver  your parcel`}</Text>
                                        
                                    </View>
                                </ProgressStep>
                                <ProgressStep label="Complete">
                                    <View style={{ alignItems: 'center' }}>

                                        <ParcelIcon width={80} height={80} />
                                        <Text>Your parcel has been delivered</Text>
                                    </View>
                                </ProgressStep>
                            </ProgressSteps>
                        </View>

                    </View>
                </View>

                <View style={{width : "100%", height : 250 ,
                            backgroundColor : "#F57301",alignItems : "center"}}>
                    <View style={{width : "100%" ,backgroundColor :"#000",height: 100, flexDirection : "row",alignItems : "center",paddingHorizontal : 24 }}>
                        <Image source={images.headShot} style={{width: 60, height : 60, borderRadius : 30}} />
                        <View style={{height : "100%", justifyContent : "center",padding : 16 }}>
                            <Text style={styles.driverName} >{driver?.displayName}</Text>
                            {/* <Text style={styles.driverName} >Vehicle Name</Text> */}
                            <Text style={styles.driverName} >{driver?.vehicleRegistration}</Text>
                            
                        </View>
                        <View style={{position : "absolute",right : 0 ,width : 120, marginRight:24, flexDirection : "row",flex : 1, justifyContent : "space-between" }}>
                            <Btn style={styles.contactBtn}>
                                <ChatIcon />
                            </Btn>
                            <Btn style={styles.contactBtn}>
                                <CallIcon />
                            </Btn>
                        </View>
                    </View>
                    <View style={{height: 150, padding : 16,width : "100%", justifyContent : "center" }}>
                        <View style={{height : 60, flexDirection : "row" , justifyContent :"center" }}>
                            <View style={{width:  20,marginRight : 8,justifyContent:"space-between",paddingVertical:10 ,alignItems: "flex-start"}}>
                                <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
                                <View style={{width:1,height:24,marginLeft : 3.5,borderRadius:4,backgroundColor :"grey" }} />
                                <View style={{width:8,height:8,backgroundColor :"#000" }} />
                            </View>

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
        fontSize : 12,
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
      fontSize :  12, 
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
