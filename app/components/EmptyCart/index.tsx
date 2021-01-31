
import { Colors } from 'constants/'
import React, { Component} from 'react'
import { View, Text } from 'react-native'

const ShoppingListEmpty = () => {

    return(
      <View 
        style={{ 
          width : "100%", height : 180,
          alignItems : "center",justifyContent : "center"
        }}
      >
          {/* <BagIcon /> */}
          <Text style={{textAlign : "center",marginVertical : 8 , color : Colors.overlayDark70}}>
           {"Add items to your shopping list and\nlet's get you what you need."}
          </Text>
      </View>

    )
  }
export default ShoppingListEmpty