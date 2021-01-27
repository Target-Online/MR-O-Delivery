

import * as React from 'react'
import { View } from 'native-base'
import { StyleSheet ,Text,TouchableOpacity as Btn, TextInput as RnTextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {inputStyles as styles} from "./styles"

interface Props{
    label : string;
    onChangeText : (e:any) => void ; 
    placeholder?: string;
    value?: string;
    error?: any;
    password?:boolean;
    onBlur : (e:any) => void; 
}

class TextInput extends React.Component<Props>{ 

    render(){ 
      const {onChangeText,onBlur,value, clear, error,label,password} = this.props

      return (  
        <View key={label} style={{height :  60, width : "100%",marginBottom : 4}}>
          <View style={[styles.textAreaStyles,styles.addressInputWrapper]} >               
            <RnTextInput value={value} onBlur={onBlur}  onChangeText={onChangeText}  secureTextEntry={password}  placeholder={label}   style={styles.addressInput} />  
            {(value !== null && value.length) ? <Btn onPress={()=>{ clear && clear()}}> 
              <Icon name="ios-close-circle-outline" style={{color : "grey", fontSize : 16 }}  size={16} />
            </Btn> : null }
          </View>
          {error && <Text style={{fontSize : 12, color : "red"}}>{error}</Text>} 
        </View>
      )
    }   
};

export default (TextInput)