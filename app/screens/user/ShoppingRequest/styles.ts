import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    emptyList : { 
      width : "100%", height : 180,
      alignItems : "center",justifyContent : "center"
    },
    addressSelector : {
      width : "100%", height : 43,
      borderRadius : 8, flexDirection : "row",
      backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, 
      borderColor: "#f9f9f9", paddingHorizontal : 16
    },
    addressvariant : {
      fontSize : 12, fontWeight : "700", 
      color : "rgba(0,0,0,0.8)",alignSelf : "flex-start",
      marginBottom : 8 
    },
    placesModalHeader: { 
      height : 64, width : "100%",
      alignItems: "center",flexDirection:"row",
      justifyContent : "space-between",
      paddingHorizontal : 16 
    },
    continueBtn : {
      width : "100%", height : 42 , borderRadius : 4, marginTop : 12,
    backgroundColor : "#F57301",alignItems : "center", justifyContent : "center" 
    },
    continueBtnText : {
      fontSize :  13 ,color : "#fff" , 
      fontWeight : "600"
    },
    subHead : {
      fontSize : 12, fontWeight : "400", 
      color : "rgba(0,0,0,0.5)",
      alignSelf : "flex-start" 
    },
    subtitles :{
      fontSize : 12, fontWeight : "700",
      color : "rgba(0,0,0,0.8)",alignSelf : "flex-start", 
      marginBottom : 8 
    },
    addItemBtn : {
      height :42,width : 42,alignSelf : "center",marginVertical : 4,
      borderRadius: 21, backgroundColor : Colors.primaryOrange, 
      justifyContent : "center",
      alignItems : "center",...shadow
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
    textAreaStyles:{
      flex : 1, height : 103, 
      borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 , marginVertical : 8
    },
  }
)
export default styles