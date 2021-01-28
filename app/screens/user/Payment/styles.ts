import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    proceed : {
        fontSize :  13 ,color : "#fff" ,
        fontWeight : "800"
    },
    addCard :{
        fontSize :  13 ,color : "#333333", 
        fontWeight : "600", 
    },
    addACardButton : {
        width : 300, height : 42 ,
        borderRadius : 4, paddingHorizontal : 24,
        marginTop : 12,flexDirection : "row",
        borderColor : "rgba(0,0,0,0.1)", borderWidth : 1, 
        backgroundColor : "#fff" , alignItems : "center", 
        justifyContent : "space-between" 
    },
    cashOption :  {
        width : "100%", minHeight : 100,
        justifyContent : "center",
        alignItems : "center" ,paddingHorizontal : 24
    },
    cardOption : {
        width : 300, height : 42, borderRadius : 4, 
        paddingHorizontal : 24, marginTop : 12,
        flexDirection : "row",borderWidth : 1, 
        backgroundColor : "#fff" , alignItems : "center", 
        justifyContent : "space-between" 
    },
    routeSummaryPad : {
        width : "100%", height:  120,
        backgroundColor: "#F57301",opacity : 0.8,
        position : "absolute", top : 0
    },
    scroll: {flex : 1,paddingBottom : 40}, 
    scrollContent : {
        alignItems : "center" ,marginBottom : 40
    },
    verified  : {
        width : 16,height:16, 
        borderRadius : 8 ,backgroundColor : "transparent",
        alignSelf : "flex-end",marginRight :4
    },
    optionIcon : {
        width : 100, height: 50, 
        borderWidth : 1, position : "absolute", 
        top: 8,justifyContent:"center" 
    },
    paymentMethodsWrapper : { 
        flexDirection : "row", padding : 24,
        marginTop : 4,  justifyContent: 'center', 
        alignItems : 'center',width : '100%', 
        height : 90 
    },
    proceedBtn: { 
        width : 300, height : 42 , borderRadius : 4, marginTop : 12,
        backgroundColor : "#F57301",alignItems : "center", 
        justifyContent : "center",alignSelf : "center" 
    },
    cashDeliveryNote :{
        fontSize : 12,
        marginVertical : 4,
        textAlign : "center"
    },
})