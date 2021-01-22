import { Colors } from "@constants";
import {Dimensions, StyleSheet} from "react-native"
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    wrapper : { 
        minHeight: height * 1.5,
        paddingBottom: height / 2,
        backgroundColor : "rgba(33,44,54,0.9)", 
        flex : 2,alignItems: "center", width : "100%",
        justifyContent : "center" 
    },
    userText : {
        color : Colors.overlayDark60,
        fontSize : 13
    },
    topBlackBar : {
        backgroundColor : "#000", height : 42,
        width : "100%" , flexDirection : "row",
        alignItems : "center",paddingHorizontal : 8 
    },
    commentInput : { 
        borderBottomColor : Colors.overlayDark50,
        alignSelf : "center",borderBottomWidth : 1,
        width : "90%", height: 32 
    },
    continueBtn: {
        width : "90%",height : 42 ,
        alignItems : "center", justifyContent : "center",
        backgroundColor : Colors.primaryOrange,
        borderRadius : 3, alignSelf : "center"
    },
    userDetails : {
        alignSelf : "center", alignItems : "center",
        padding : 12, height : 120,
        justifyContent : "space-around"
    },
    closeIcon : {
        width : 30, height : 30,
        justifyContent : "center"
    },
    btnsWrapper: {
        width : "100%", position  : "absolute",
        bottom : 16, justifyContent:"flex-end",
        alignSelf : "center"
    },
    buttonStyle:{
        width : 200 ,height : 42,marginTop: 4,
        borderRadius : 3  ,backgroundColor: Colors.primaryOrange , 
        alignSelf : "center",alignItems : "center",justifyContent : "center"
    },
    dialogContainer : { 
        width : width*0.9 ,height : 300 ,
        backgroundColor : "#fff" , borderRadius : 6,
        padding : 16
    },
    title : {
        fontSize : 16,fontWeight: "700",
        textAlign :"center",alignSelf : "center", 
        position : "absolute", top : 36
    },
    btnText:{
        color:"#454F5B",
        fontSize :14
    },
    textBold : {
      fontSize :14
  },
  searchBarWrapper: {
      width : "60%",
      flex : 1,
      alignSelf : "center",
      alignItems : "center",
      flexDirection : "row",
      backgroundColor : "rgba(0,0,0,0.1)",
      borderRadius :24,
      paddingHorizontal : 16,
      marginRight : 6
  },
});

export default styles