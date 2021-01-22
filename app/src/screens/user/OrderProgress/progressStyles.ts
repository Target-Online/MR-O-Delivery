import { Colors } from "constants"
import {Dimensions, StyleSheet} from "react-native"

const  { width } = Dimensions.get('window')
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

export default styles