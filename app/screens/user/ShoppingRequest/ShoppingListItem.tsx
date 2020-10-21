import { EvilIcons } from '@expo/vector-icons';
import React from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'
import _ from 'lodash'
import { Colors } from '../../../constants'

interface IProps {
    item : {name : string, description : string};
    onDelete : () => void ;
}

const ShoppingListItem = ({item , onDelete} : IProps) => {

    const {name , description} = item
    return(
        <View style={styles.wrapper} >
            <View>
                <Text style={{ fontSize : 13 }} >{name}</Text>
                <Text style={{color : Colors.overlayDark60 , fontSize : 11}} >{description}</Text>
            </View>
            <Btn
                onPress={()=> onDelete && onDelete()}
                style={styles.deleteButton}>
                <EvilIcons name="trash" size={24} color="black" />
            </Btn>
        </View>
    )
}

export default ShoppingListItem
  
const styles = StyleSheet.create({
    wrapper:{
        width : "100%", height : 58,
        marginVertical : 3, alignItems : "center",
        borderColor :Colors.overlayDark20,
        borderWidth : 1,borderRadius : 4, flexDirection : "row", 
        justifyContent : "space-between", paddingHorizontal : 16
    },
    deleteButton : {
        width: 30,height :30, 
        borderRadius: 15,justifyContent : "center",
        alignItems : "center",
        backgroundColor : Colors.overlayLight70
    }
  }
)