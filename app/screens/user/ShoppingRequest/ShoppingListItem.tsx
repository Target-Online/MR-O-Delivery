import { EvilIcons } from '@expo/vector-icons';
import React from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'
import _ from 'lodash'
import { Colors } from '../../../constants'


const ShoppingListItem = () => (
    <View style={styles.wrapper} >
        <View>
            <Text>
            "item"
            </Text>

            <Text>
            "Description"
            </Text>

        </View>
        <Btn style={{width: 30,height :30, borderRadius: 15,justifyContent : "center",alignItems : "center", backgroundColor : Colors.overlayLight70}}>
            <EvilIcons name="trash" size={24} color="black" />
        </Btn>


    </View>
)

export default ShoppingListItem
  

const styles = StyleSheet.create({
    wrapper:{
        width : "100%", height : 52,
        marginVertical : 3, alignItems : "center",
        borderColor :Colors.overlayDark20,
        borderWidth : 1,
        borderRadius : 4, flexDirection : "row", 
        justifyContent : "space-between", paddingHorizontal : 8
    }
  }
)