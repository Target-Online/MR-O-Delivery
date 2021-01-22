import React, { useState } from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput,FlatList } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShoppingListItem from './ShoppingListItem'
import { Colors } from '@constants'
import { IOrder } from 'src/types'


interface IProps {
    showPrompt : boolean;
    addItem : (item: any) => void;
    onClose : () => void;

}
const AddItemPrompt = (props : IProps) => {
    
    const [ name , setName ] = useState("")
    const [ description , setDescription ] = useState("")
    const {showPrompt , addItem , onClose} = props

    return (
        <Modal transparent visible={showPrompt}>
          <View style={{backgroundColor : "rgba(0,0,0,0.3)", flex: 1 , justifyContent : "center", alignItems : "center"}}>
            <View style={styles.addItemWrapper}>
                <Btn onPress={()=> {
                        onClose && onClose()
                     }}
                    style={styles.closeIcon} >
                    <Ionicons  name="md-close-circle-outline" style={{fontSize : 24}} />  
                </Btn>
                <Text style={styles.title} >
                    Add Item 
                </Text>
                <View style={[styles.textAreaStyles,{height : 56,flex : 0, paddingVertical :2}]} >  
                    <TextInput 
                        value={name}
                        onChangeText={(text)=> { 
                            setName(text)
                        }}
                        placeholder={"Item name"} 
                        style={styles.itemInput}
                    />
                </View>
                <View style={[styles.textAreaStyles,{height : 64,flex : 0, paddingVertical :2}]} >  
                    <TextInput 
                        value={description}
                        onChangeText={(text)=> { 
                            setDescription(text)
                        }}
                        numberOfLines={2}
                        placeholder={"Description/Quantity"} 
                        style={styles.itemInput}
                    />
                </View>
            
            <Btn 
                onPress={()=>{ 
                    addItem && addItem({name,description})    
                    setName('')  
                    setDescription('')  
                }}
                style={styles.continueBtn}>
                  <Text style={styles.continueBtnText}> Add Item </Text>
            </Btn>
            </View>
          </View>
        </Modal>
      )
  }


export default AddItemPrompt
  

const shadow =  {
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 2
    },
    elevation: 10
  }

const styles = StyleSheet.create({
    activeTextStyle:{
        color : 'red'
    },
    title: { 
        marginTop : 52 , alignSelf : "center", 
        fontSize : 14, fontWeight : "bold" ,
        marginVertical :2 
    },
    itemInput : { 
      fontSize :  12, height: 56,
      flex : 1, textAlignVertical : "center"
    },
    closeIcon : {
      width : 50 ,height : 50,
      borderRadius : 25 , position: "absolute" ,
      top: 4,right: 4,alignItems : "center",justifyContent : "center"
    },
    addItemWrapper : {
      width : "90%",paddingHorizontal :  24,
      height : 300, borderRadius : 4,
      backgroundColor : "white"
    },
    continueBtn : {
      width : "100%", height : 42 , borderRadius : 4, marginTop : 12,
    backgroundColor : "#F57301",alignItems : "center", justifyContent : "center" 
    },
    continueBtnText : {
      fontSize :  13 ,color : "#fff" , 
      fontWeight : "600"
    },

    addressInputWrapper: { 
      height : 38, flex :0, 
      backgroundColor : "rgba(0,0,0,0.04)",
      borderRadius : 2  ,paddingVertical : 0
    },
    addressInput : { 
      flex : 1 ,
      fontSize :  14, height: "100%",
      textAlignVertical : "center"
    },
    textAreaStyles:{
      flex : 1, height : 103, 
      borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 , marginVertical : 8
    },
    container: {
      flex : 1 ,
      paddingTop : 42,
      backgroundColor : "#FEFEFE", 
      paddingHorizontal : 24,
      paddingVertical : 36,
      alignItems : "center"
    },
    btnStyle:{ 
      width: 250, height: 86,
      borderRadius: 3, ...shadow,
      backgroundColor :"#fff",alignItems : "center",
      justifyContent : "flex-start", 
      flexDirection : "row", paddingHorizontal : 24 
    },
    tabStyle : { 
      backgroundColor : 'white'
    }
  }
)