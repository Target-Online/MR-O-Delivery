import { Colors } from "constants/"
import { Dimensions, StyleSheet } from "react-native"
import shadow from "utils/shadow"

const  { height , width } = Dimensions.get('window')
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

const progressStyles = StyleSheet.create({
    continueBtn : {
        width : width - 48 ,marginHorizontal : 16,
        height : 42, marginTop : 16,alignSelf : "center",
        alignItems : "center" , justifyContent : "center",
        borderRadius : 4, backgroundColor : Colors.primaryOrange,
    },
    shoppingListContainer : {
        flex : 1,width : "100%",
        paddingHorizontal : 24
    },
    shoppingList : {
        flex : 1, width : "100%" 
    },

    yourShoppingList : {
        height: 30,marginTop : 16, 
        paddingHorizontal : 24, width : "100%", 
        justifyContent : "center" 
    },
    continueText : {
        fontSize : 16 , fontWeight : "bold", color : "white"
    },
    slipAmount:{
        color : Colors.primaryOrange,fontSize : 13
    },
    slipSubHead : {
        color : Colors.overlayDark60,fontSize : 14
    },
    summaryHead : {
        fontWeight  : "bold", fontSize : 13,
    },
    summaryRow:{},
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
})


const styles = StyleSheet.create({
    routesSummary : {
        height: 150, padding : 16,
        width : "100%", justifyContent : "center" 
    },
    step: {
        flex: 1, paddingHorizontal : 16, 
        paddingTop : 46
    },
    orderDetailsHead : {
        height :  20 ,alignItems : "center"
    },
    bottom : {
        width: "100%", height : height - 340,
        backgroundColor : "#F57301",
        alignItems: "center" , flex : 1
    },
    top : {
        width: "100%", minHeight: 340,
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
    addressInput : { 
      fontSize :  10, 
    },
    textAreaStyles:{
      flex : 1, height : 32, borderRadius : 2,
      paddingHorizontal : 16 
    },
  })


export {
    progressStyles,
    customStyles,
    styles
} 