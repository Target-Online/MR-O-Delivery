
import React, { useState } from 'react';
import {SafeAreaView,StyleSheet,
  ScrollView,View,ImageBackground
  , Text, StatusBar,TouchableHighlight as Btn,
} from 'react-native'
import Fonts from '../../../constants/fonts'
import { Icon, Container, Button, Content, Tabs, Form, Item, Input,ScrollableTab, Label } from 'native-base'
import TextInput from './TextInput';
import withForgetPasswordValidation, {WithSignInFormProps} from './withForgetPasswordValidation';
import images from '../../../assets/images';
import { Image } from '../../../components';
import  { withAppContext } from '../../../AppContext';
import { Colors } from '../../../constants';
import BackScreen from '../../../layouts/BackScreen';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';


type IProps = {
  signIn() : () => void;
  onCancel : () => void;
}

type FormProps = WithSignInFormProps & IProps & {context : any } & StackScreenProps<{navigation : any}>

const ForgotPassword: React.SFC<FormProps> = props => {

    const { errors, values, touched, handleBlur, onCancel, context ,navigation} = props
    const { resetPassword, register } = context

    return (

      <BackScreen
        title="Reset Password"
        onBackPress={()=> navigation.goBack()}
      >
        <View style={{flex : 1, alignItems : 'center' , paddingHorizontal : 30, justifyContent :'flex-start', paddingTop : 24}}>
          <Image width={150} height={150} source={images.logo} />
          <Text style={{alignSelf : "flex-start" , marginVertical : 8}}>Forgot Your Password?  </Text>
          <Text style={{alignSelf : "flex-start" , marginBottom : 36, color : "rgba(0,0,0,0.4)", fontSize :12}}>
            Please enter your account registered email address below and we will send your a link 
            with steps to resetting your password.
          </Text>
          <TextInput 
              label="E-mail Address"
              value={values.email}
              onChangeText={props.handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
          /> 
      
          <Btn underlayColor="#eaeaea"  onPress={()=> resetPassword(values.email) }
            style={styles.btnStyle} 
          >
            <Text style={{fontSize : 12, color : "#fff" , fontWeight:"500" }} >Reset Password</Text>
          </Btn>
          <Btn underlayColor="#eaeaea"  onPress={()=> props.navigation.goBack() }
            style={{marginVertical : 8 , width : 200,alignItems : "center",justifyContent : "center",borderRadius : 8, height : 36}} 
          >
            <Text style={{fontSize : 12, color : "#000" , fontWeight:"500" }} >Cancel</Text>
          </Btn>

        </View>
      </BackScreen>
    )
    
}

export default withForgetPasswordValidation(withAppContext(ForgotPassword))

const styles = StyleSheet.create({
    textBox: {
      flex: 1,
      padding: 35,
      textAlign: 'center'
    },
    btnStyle :{ 
      width :  300, height : 46, 
      borderRadius : 3, justifyContent : 'center', 
      alignItems : 'center', alignSelf : "center",
      backgroundColor: Colors.primaryOrange,  marginTop : 24 
    },
    view: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 24,
      paddingBottom: 30,
      backgroundColor: '#000000'
    },
    center: {
      textAlign: 'center',
      paddingVertical: 15
    },
    item: {
      marginRight: 'auto'
    },
    inputContainer: {
      backgroundColor: '#FFFFFF',
      height: 50,
      justifyContent: 'center',
      borderRadius: 3
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 40
    },
    socialBtnTitle: {
      ...Fonts.tinyBold,
      paddingHorizontal: 8,
      color: 'white'
    },
    socialButtonStyle: {
      backgroundColor: '#000000',
      borderRadius: 3,
      borderWidth: 1,
      height: 60,
      borderColor: '#3E3E3E'
    },
    link: {
      alignSelf: 'center',
      marginTop: 25,
      color: '#989898'
    },
    orText: {
      ...Fonts.captionBold,
      color: 'white',
      alignSelf: 'center',
      marginVertical: 10
    }
  });