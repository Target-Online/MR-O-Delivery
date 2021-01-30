import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    backBtnStyle:{
      alignSelf : "flex-start",
      width : 30,height: 30
    },
    addressTopRow: {
      width: "100%",justifyContent : "space-between", 
      alignSelf : "center",alignItems : "center", 
      flexDirection : "row"
    },
    addressBottom : { 
      flexDirection : "row", height : 100,
      justifyContent:"space-between", marginTop : 16
    },
    addressTop: {
      width : "100%" , alignItems : "flex-end",paddingVertical: 36,paddingHorizontal  :24, backgroundColor : "#fff", ...shadow
    },
    addressVariantTrigger : {
      width : "100%", height : 43, 
      borderRadius : 8, flexDirection : "row",
      backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, 
      borderColor: "#f9f9f9", paddingHorizontal : 16 
    },
    addressVariant : {
      fontSize : 12, fontWeight : "700", 
      color : "rgba(0,0,0,0.8)", 
      alignSelf : "flex-start", 
      marginBottom : 8 
    },
    autoComplete : {
      height : 64, width : "100%",
      alignItems: "center",flexDirection:"row",
      justifyContent : "space-between",paddingHorizontal : 16 
    },
    parcelDetails : {
      fontSize : 12, fontWeight : "700", 
      color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", 
      marginBottom : 8 
    },
    truckIcon : {
      transform:[ {scaleX : -1 }], alignSelf: "flex-start", marginTop : 8,marginBottom : 24 
    },
    itemName: { 
      fontSize :  12, height: "100%",
      flex : 1 ,textAlignVertical : "center"
    },
    top: {
      width : "100%", height:  140, 
      flexDirection : "row",justifyContent:"flex-end",
      alignItems : "center"
    },
    continue : {
      width : "100%", height : 42, borderRadius : 4, marginTop : 12,
    backgroundColor : "#F57301",alignItems : "center", justifyContent : "center" 
    },
    weWillPickUp : {
      fontSize : 12, fontWeight : "400", 
      color : "rgba(0,0,0,0.5)",alignSelf : "flex-start" 
    },
    itemDescriptionInput: { 
      fontSize :  12, height: "100%", 
      flex : 1 ,textAlignVertical : "top"
    },
    continueTxt: {
      fontSize :  13 ,color : "#fff" , fontWeight : "600"
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
    container: {flex : 1, paddingHorizontal : 24}  
})

export default styles