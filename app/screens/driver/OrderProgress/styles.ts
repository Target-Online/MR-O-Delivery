import {  Dimensions, StyleSheet } from 'react-native'
import shadow from 'utils/shadow'
import { Colors } from '../../../constants'
const  { width, height } = Dimensions.get('window')
export const progressStyles = StyleSheet.create({
    driverName:{
        color : '#fff',
        fontSize : 10,
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

export const customStyles = {
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
  
export const confirmStyles = StyleSheet.create({

    continueBtn : {
        width : width - 48 ,marginHorizontal : 16,
        height : 42, marginTop : 16,alignSelf : "center",
        alignItems : "center" , justifyContent : "center",
        borderRadius : 4, backgroundColor : Colors.primaryOrange,
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
    summaryRow:{
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
    orderSummary: {
        marginTop : 4, height: 280,
        width: width - 48 ,borderRadius: 3, 
        justifyContent : "space-between", backgroundColor : "#fff", 
        ...shadow ,padding : 24,
        alignSelf : "center"
    },
    tabStyle : {backgroundColor : 'white'}
  
  })