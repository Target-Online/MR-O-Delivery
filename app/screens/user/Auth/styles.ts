import {StyleSheet} from "react-native"
import { Colors } from 'constants'
import shadow from 'utils/shadow';

const profileLoadStyles = StyleSheet.create({
    saveBtn : { 
        width: 300, height: 46,
        borderRadius: 3, justifyContent: 'center', 
        alignItems: 'center', backgroundColor: Colors.primaryOrange, 
        marginTop: 24 
    },
    submitText : { 
        fontSize: 12, color: "#fff", 
        fontWeight: "500" 
    },
    wrapper : { flex: 1, alignItems: 'center', padding: 24 }
})

const inputStyles = StyleSheet.create({
    addressInputWrapper: { 
      height : 42, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
        flex : 1 ,
        fontSize :  14, height: "100%",
        textAlignVertical : "center"
    },
    textAreaStyles:{
        borderRadius : 8,paddingVertical: 16,flexDirection : "row",
        backgroundColor : "rgba(0,0,0,0.035)",
        alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
        paddingHorizontal : 16 
    },
})

export {
    profileLoadStyles,
    inputStyles
}