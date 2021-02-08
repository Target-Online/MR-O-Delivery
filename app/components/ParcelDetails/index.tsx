import React from "react"
import { IOrder } from "types"
import { View, StyleSheet, Text } from "react-native"
import ParcelIcon from "assets/icons/ParcelIcon"
import BagIcon from "assets/icons/BagIcon"

const ParcelDetails = ({order} : {order :IOrder}) => {

    const  { orderType , storeName} =   order
    const {name, description ,} = order.items[0]
    const isShopping = orderType === "Shopping"

    return(
      <View style={styles.parcelDetailsWrapper}>
        {isShopping ? <BagIcon width={30} height={30} /> : <ParcelIcon width={30} height={30} />}
        <View style={{marginLeft : 8}}>
          <Text style={{fontSize : 12,}}>{isShopping? "Shopping from :" :  name}</Text>
          <Text numberOfLines={1} style={{fontSize : 11, color : "grey"}} >{isShopping? storeName :  description}</Text>
        </View>
      </View>
    )
  }

const styles = StyleSheet.create({
  parcelDetailsWrapper : {
    flexDirection : "row", height: 56, 
    width : "100%",alignItems : "center"
  },
})



export default ParcelDetails