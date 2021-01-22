import { StyleSheet } from 'react-native'

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
    activeTextStyle:{
        color : 'red'
    },
    addressVariantText: {
        fontSize : 12, fontWeight : "700", 
        color : "rgba(0,0,0,0.8)",alignSelf : "flex-start",
        marginBottom : 8 
    },
    placeOrderBtn : {
        width : "100%", height : 42 , 
        borderRadius : 4, marginTop : 12,
        backgroundColor : "#F57301",alignItems : "center", 
        justifyContent : "center" 
    },
    truckIcon : {
        transform:[ {scaleX : -1 }], 
        alignSelf: "flex-start", 
        marginTop : 8,
        marginBottom : 24 
    },
    addressSelectionTriggerWrapper : {
        width : "100%", height : 43, 
        borderRadius : 8, flexDirection : "row",
        backgroundColor : "rgba(0,0,0,0.035)",
        alignItems:"center" ,borderWidth : 2, 
        borderColor: "#f9f9f9", paddingHorizontal : 16 
    },
    addressInputHeader: {
        height : 64, width : "100%",
        alignItems: "center",flexDirection:"row",
        justifyContent : "space-between",
        paddingHorizontal : 16
    },
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    pickUpHeading: {
      fontSize : 22, fontWeight : "700",
      color : "rgba(0,0,0,0.8)",
      alignSelf : "flex-start",
      marginBottom : 8 
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
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 243, 
      borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
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
      flexDirection : "row", paddingHorizontal : 24 
    },
    tabStyle : { 
      backgroundColor : 'white'
    },
    top: {
        width : "100%", height:  140,
        flexDirection : "row",justifyContent:"flex-end",
        alignItems : "center"
    }
  
  })



  export default styles