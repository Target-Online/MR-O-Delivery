import { EvilIcons } from '@expo/vector-icons';
import React from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'
import _ from 'lodash'
import { Colors } from '../../constants'
import { Ionicons } from '@expo/vector-icons'

interface IProps {
    item : {name : string, description : string , price? : string};
    onDelete : () => void ;
    driverVariant?: boolean ;
}

const ShoppingListItem = ({item , onDelete , driverVariant} : IProps) => {

    const {name , description, price , } = item
    return(
        <View style={[styles.wrapper , driverVariant && styles.longerCard]} >
            <View>
                <Text style={{ fontSize : 13 }} >{name}</Text>
                <View style={{flexDirection : "row"}} >
                    <Text style={{color : Colors.overlayDark60 , fontSize : 11}} >{description}</Text>
                    {price && <Text style={styles.priceText} >{`N${price}`}</Text>}
                </View>
            </View>
            {!driverVariant ?
                <Btn
                    onPress={()=> onDelete && onDelete()}
                    style={styles.deleteButton}>
                    <EvilIcons name="trash" size={24} color="black" />
                </Btn> :

                <View style={{flexDirection : "row" , flex: 1 , alignItems : "flex-end", paddingHorizontal : 0}}>
                    <View style={styles.textInput}>
                            <TextInput 
                                onChangeText={(text)=>{
                                }}
                                placeholder="Price"
                            />
                            <Btn style={styles.priceConfirm}>
                            <Ionicons name="md-arrow-round-forward" size={20} color="white" />  
                            </Btn>
                    </View>      

                    <Btn style={styles.outOfStock}>
                            <Text style={styles.outOfStockText} > Out Of Stock </Text>
                    </Btn>        
                </View>
            }
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
    priceText : {
        color : Colors.primaryOrange , fontSize : 11 ,
        marginLeft : 8 
    },
    longerCard : { 
        height : 124 , flexDirection : "column",
        padding: 16,justifyContent : "space-between", 
        alignItems : "flex-start"
    },
    priceConfirm :{
        backgroundColor : Colors.primaryOrange, 
        width : 42, height : 42,
        alignItems : "center",justifyContent : "center",
        borderTopRightRadius : 4, borderBottomRightRadius :4
    },
    deleteButton : {
        width: 30,height :30, 
        borderRadius: 15,justifyContent : "center",
        alignItems : "center",
        backgroundColor : Colors.overlayLight70
    },
    outOfStock:{
        height : 42,width :  102, marginLeft : 8,
        backgroundColor : Colors.white,
        borderRadius : 4, borderColor : Colors.primaryOrange,
        borderWidth : 1, alignItems : "center",
        justifyContent : "center"
    },
    outOfStockText:{
        fontSize : 13,
        color : Colors.overlayDark70

    },
    textInput:{
        height : 42,width : 142,
        borderRadius : 4,paddingVertical: 4,
        flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
        alignItems:"center" ,borderWidth : 2,justifyContent : "space-between", 
        borderColor: "#f9f9f9", paddingLeft : 16 ,
      }
  }
)