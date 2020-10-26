
import React, { Component} from 'react'
import { View, Text , TouchableOpacity as Btn, ScrollView, StyleSheet} from 'react-native'
import ParcelIcon from '../../assets/icons/ParcelIcon'
import { withAppContext, IContextProps, IAddress } from '../AppContext'
import BackScreen from '../../layouts/BackScreen'
import Loader from '../../'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getDistance, getPreciseDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types'

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