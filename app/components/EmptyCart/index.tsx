
import strings from 'constants/strings'
import { Colors } from 'constants/'
import React from 'react'
import { View, Text } from 'react-native'

const ShoppingListEmpty = () => {

    return(
      <View 
        style={{ 
          width : "100%", height : 180,
          alignItems : "center",justifyContent : "center"
        }}
      >
          <Text style={{textAlign : "center",marginVertical : 8 , color : Colors.overlayDark70}}>
           {strings.addItemsYouNeed}
          </Text>
      </View>

    )
  }
export default ShoppingListEmpty