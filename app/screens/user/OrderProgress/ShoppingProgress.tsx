import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, Image, StyleSheet , Linking, Dimensions, FlatList} from 'react-native'
import ParcelIcon from '../../../assets/icons/ParcelIcon'
import ParcelDelivered from '../../../assets/icons/ParcelDelivered'
import images from '../../../assets/images'
import ChatIcon from '../../../assets/icons/ChatIcon'
import InfoIcon from '../../../assets/icons/InfoIcon'
import BackScreen from '../../../layouts/BackScreen'
import { IContextProps, withAppContext } from '../../../AppContext'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import StepIndicator from 'react-native-step-indicator';
import firebase from 'firebase'
import UserCard from '../../../components/UserCard'
import ShoppingListItem from '../../../components/ShoppingListItem'
import { Colors } from '../../../constants'
const  { height , width } = Dimensions.get('window')

const labels = ["Confirmation", "Parcel Collection" ,"On Route","Delivered"]

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
const orderProgress = [ "pending", "confirmed" , "collected" , "delivered"]

class ShoppingProgress extends Component<IProps> {
    constructor (props) {
      super(props)
    }

    componentDidMount(){
        const {context : {sendRequest , order,setOrder, drivers, getAllDrivers}} = this.props
        const {dropOffAddress , pickUpAddress , items,status,  driver, total}  = order
        const {orderId} = order
        var ref = firebase.database().ref(`orders/${orderId}`);
        ref.on('value', function(snapshot) {
            // Do whatever
            if(snapshot.val()){
                const order = snapshot.val()
                setOrder(order)
            }
        });

    }


    removeItem = (index: number) => {

    }

    render () {

        const {context : {sendRequest ,setAlertData,setShowAlert, order,setOrder, drivers, getAllDrivers}} = this.props
        const {dropOffAddress , pickUpAddress , items,customer,  driver, orderId}  = order
        const { displayName , vehicleRegistration , phoneNumber , profilePicUrl}  = driver || {} 
        const driverPicURL = profilePicUrl ? {uri : profilePicUrl} : images.headShot

        console.log({items})
        return ( 
            <BackScreen 
                // scroll
                title={"Confirm Your Order"}
                navigation={this.props.navigation}          
            >
                <View style={{flex : 1 , }}>
                   <UserCard user={driver} />
                   <View style={styles.nbCard}>

                        <InfoIcon fill={Colors.primaryOrange} />
                        <Text style={styles.nbText} > {`We have to wait for ${displayName} to confirm the prices and stock availability`} </Text>

                    </View>
                    <View style={{height: 30,marginTop : 16, paddingHorizontal : 24, width : "100%", justifyContent : "center" }}>
                        <Text style={{fontSize : 18, fontWeight : "bold"}}>Your Shopping List</Text>
                    </View>

                    <FlatList 
                        data={items}
                        contentContainerStyle={{
                            flex : 1,width : "100%",
                            paddingHorizontal : 24
                        }}
                        // ListEmptyComponent={this.renderListEmpty()}
                        style={{flex : 1, width : "100%" }}
                        renderItem={({item,index})=>(
                            <ShoppingListItem onDelete={()=>{ this.removeItem(index) }}  item={item} />
                        )}
                    />
                    <View style={styles.orderSummary}>
                        <Text style={styles.summaryHead}> {`${customer.displayName}'s Order Summary`} </Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >Items Cost</Text>
                            <Text style={styles.slipAmount}>N 10000</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >Delivery Fee  </Text>
                            <Text style={styles.slipAmount}>N 7000</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.slipSubHead} >Items Cost</Text>
                            <Text style={styles.slipAmount}>N 10000</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryHead} >Order Total </Text>
                            <Text style={[styles.summaryHead ,styles.slipAmount]}>N 7000</Text>
                        </View>
                    </View>

                    <Btn style={styles.continueBtn}>
                        <Text style={{fontSize : 16 , fontWeight : "bold", color : "white"}}>
                            Continue
                        </Text>
                    </Btn>
                
                </View>
            </BackScreen>
      )
    }

}

export default withAppContext(ShoppingProgress)

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
    continueBtn : {
        width : width - 48 ,marginHorizontal : 16,
        height : 42, marginTop : 16,alignSelf : "center",
        alignItems : "center" , justifyContent : "center",
        borderRadius : 4, backgroundColor : Colors.primaryOrange,
    },
    orderTrackHead : {
        fontSize : 16,fontWeight : "bold",
    },
    slipAmount:{
        color : Colors.primaryOrange,fontSize : 13
    },
    slipSubHead : {
        color : Colors.overlayDark60,fontSize : 14
    },
    summaryHead : {
        fontWeight  : "bold",
        fontSize : 13,
    },
    trackingId : {
        height: 26 , borderColor :  "grey", 
        borderWidth : 1, borderRadius : 3,
        padding : 4, marginVertical : 8
    },
    summaryRow:{

    },
    deliveryStep :{
        alignItems : "center",
        textAlign:"center",
        marginTop : 16
    },
    nbText: {
        color : Colors.overlayDark60,
        fontSize : 12,marginLeft : 8
    },
    nbCard: {
        height : 52,alignItems : "center", backgroundColor : "white",
        width : "100%" , paddingHorizontal : 16,
        flexDirection : "row",...shadow
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
        marginTop : 4, height: 280,
        width: width - 48 ,borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24,
        alignSelf : "center"
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
