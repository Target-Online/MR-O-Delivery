import {StyleSheet} from "react-native"

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
    routeTrace : {
        width:  20,marginRight: 8,
        justifyContent:"space-between",
        paddingVertical:10,
        alignItems: "flex-start"
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
    tabStyle : {backgroundColor : 'white'},
    bottom : {
        width : "100%", height : height - 340,
        backgroundColor : "#F57301",alignItems : "center" ,
        flex : 1
    }
  
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
  export default styles