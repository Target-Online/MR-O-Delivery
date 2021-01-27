import React from "react"
import { View } from "react-native"

const Points = () => {
    return (
        <View style={{width:  20,marginRight : 8,justifyContent:"space-between",paddingVertical:10 ,alignItems: "flex-start"}}>
            <View style={{width:8,height:8,borderRadius:4,backgroundColor :"#000" }} />
            <View style={{width:1,height:24,marginLeft : 3.5,borderRadius:4,backgroundColor :"grey" }} />
            <View style={{width:8,height:8,backgroundColor :"#000" }} />
        </View>
    )
}

export default Points