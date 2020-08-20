
import React, { useState } from 'react';
import { StyleSheet,ScrollView,View, 
  Text, StatusBar,TouchableHighlight as Btn} from 'react-native'
import Fonts from '../../../constants/fonts'
import TextInput from './TextInput';
import withSignInValidation, {WithSignInFormProps} from './withSignInValidation';
import images from '../../../assets/images';
import { Image } from '../../../components';
import { withAppContext } from '../../../AppContext';
import { Colors } from '../../../constants';
import BackScreen from '../../../layouts/BackScreen';
import { StackScreenProps } from '@react-navigation/stack';

interface IProps {
  title?: string;
  onForgotPassword : () => void ;
  signIn() : () => void;
}

type FormProps = WithSignInFormProps & IProps & {context : any} & StackScreenProps<{navigation : any}>

const SignIn: React.SFC<FormProps> = props => {

    const { errors, values, touched, handleBlur, context,navigation } = props
    const { login, register } = context
 
    return (
        <BackScreen
          title="Sign In"
          onBackPress={()=> navigation.goBack()}
        >
          <View style={{flex : 1, alignItems : 'center' , paddingHorizontal : 30, justifyContent :'flex-start', paddingTop : 24}}>
            <Image width={150} height={150} source={images.logo} />
               
            <TextInput 
                label="E-mail Address"
                value={values.email}
                onChangeText={props.handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
            /> 
            <TextInput 
                label="Password"
                value={values.password}
                password
                onChangeText={props.handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
            /> 
            <View style={{width:"100%", alignItems:"flex-end", height:24, justifyContent:"center"}} >
                <Btn onPress={() => navigation.navigate('ForgotPassword') } >  
                  <Text style={{fontSize : 12, fontWeight : "600" }} >
                    Forgot Your Password?
                  </Text>
                </Btn>   
            </View>        

            <Btn underlayColor="#eaeaea"  onPress={()=> login(values) }
                style={{width :  300, height : 46, borderRadius : 3, justifyContent : 'center', alignItems : 'center', 
                      alignSelf : "center",backgroundColor: Colors.primaryOrange,  marginTop : 24 }} 
            >
              <Text style={{fontSize : 12, color : "#fff" , fontWeight:"500" }} >Sign In</Text>
            </Btn>

            <View style={{width:"100%", flexDirection:"row", height:32 ,justifyContent:"center", marginTop : 12}} >
                    <Text style={{fontSize : 13, fontWeight : "600" }} >
                        Don't have an account ?
                    </Text>
                    <Btn onPress={() => navigation.navigate('SignUp') } style={{}} >  
                      <Text style={{fontSize : 13, fontWeight : "600", color:"#2c59e0",marginLeft: 2}} >
                        Register
                      </Text>
                    </Btn>   
            </View>    
          </View>
        </BackScreen>
    )
    
}

export default withSignInValidation(withAppContext(SignIn))

const styles = StyleSheet.create({
    textBox: {
      flex: 1,
      padding: 35,
      textAlign: 'center'
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