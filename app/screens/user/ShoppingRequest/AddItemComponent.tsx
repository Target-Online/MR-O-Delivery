import React, { useState } from 'react'
import { Modal,StyleSheet,TouchableOpacity as Btn,View,Text,TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash'
import strings from 'constants/strings';

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
          <View style={styles.container}>
            <View style={styles.addItemWrapper}>
                <Btn onPress={()=> { onClose && onClose()}} style={styles.closeIcon} >
                    <Ionicons  name="md-close-circle-outline" style={{fontSize : 24}} />  
                </Btn>
                    <Text style={styles.title} >{strings.itemName}</Text>
                <View style={[styles.textAreaStyles,{height : 56,flex : 0, paddingVertical :2}]} >  
                    <TextInput 
                        value={name}
                        onChangeText={(text)=> {  setName(text)}}
                        placeholder={strings.itemName} 
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
                        placeholder={strings.descriptionQty} 
                        style={styles.itemInput}
                    />
                </View>
            
            <Btn onPress={()=>{ 
                    addItem && addItem({name,description})    
                    setName('')  
                    setDescription('')  
                }}
                style={styles.continueBtn}>
                  <Text style={styles.continueBtnText}>{strings.addItem}</Text>
            </Btn>
            </View>
          </View>
        </Modal>
      )
  }


export default AddItemPrompt
  
const styles = StyleSheet.create({
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
    textAreaStyles:{
      flex : 1, height : 103, 
      borderRadius : 8,paddingVertical: 16,
      flexDirection : "row",backgroundColor : "rgba(0,0,0,0.035)",
      alignItems:"center" ,borderWidth : 2, borderColor: "#f9f9f9", 
      paddingHorizontal : 16 , marginVertical : 8
    },
    container: {
      backgroundColor : "rgba(0,0,0,0.3)", 
      flex: 1 , justifyContent : "center", 
      alignItems : "center"
    },
  }
)