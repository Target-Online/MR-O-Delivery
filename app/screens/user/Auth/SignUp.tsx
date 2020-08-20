
import React from 'react';
import { ScrollView,View,
  Text, TouchableHighlight as Btn
} from 'react-native';
import {Icon, Container, Button, Content, Tabs, Form, Item, Input,ScrollableTab } from 'native-base';
import { Image } from '../../../components';
import images from '../../../assets/images';
import TextInput from "./TextInput"
import withSignUpValidation,{WithSignUpFormProps} from './withSignUpValidation';
import firebase from 'firebase';
import { Colors } from '../../../constants';
import {withAppContext} from '../../../AppContext';
import BackScreen from '../../../layouts/BackScreen';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
// import firebase from 'firebase'

interface IProps {
    title?: string;
    signIn() : () => void;
  }
type FormProps = IProps &  WithSignUpFormProps & StackScreenProps<{navigation : any}>

class SignUp extends React.Component<FormProps> {
  
    state={
        name :null,
        email : null,
        password : null,
        passConfirm : null,
    }

    submitForm = (values: { email: string; password: string; }) =>{
        const { context : {register}} = this.props

        register(values)
        // firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((res) => console.log({res}))
        // .catch(err => console.log({err}))
    }

    render(){
        const {errors, handleChange,navigation, touched,handleBlur,context } = this.props
        const randomNum =  Math.floor(Math.random() * Math.floor(1000));
        const values =  context.isDev? {firstname : "Test" , lastname : "TEst Last" ,
         email : `menc${randomNum}@coo${randomNum}.com`,password: "111111",passwordConfirm : "111111",mobile : "1234567890" } : this.props.values
        return (

            <BackScreen
                title="Sign Up"
                onBackPress={()=> navigation.goBack()}
            >
            <View style={{flex : 1, alignItems : 'center' , padding : 24 }}>
                <Image width={150} height={150} source={images.logo} />
                <Content>               
                    <TextInput 
                        onChangeText={handleChange('firstname')}
                        error={touched.firstname &&errors.firstname}
                        onBlur={handleBlur('firstname')}
                        value={values.firstname}
                        label="First Name"
                    />
                    <TextInput 
                        onChangeText={handleChange('lastname')}
                        label="Last Name"
                        value={values.lastname}
                        onBlur={handleBlur('lastname')}
                        error={touched.lastname && errors.lastname}
                    /> 
                    <TextInput 
                        onChangeText={handleChange('email')}
                        label="E-mail Address"
                        value={values.email}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                    />  
                    <TextInput 
                        onChangeText={handleChange('mobile')}
                        label="Mobile Number"
                        value={values.mobile}
                        onBlur={handleBlur('mobile')}
                        error={touched.mobile && errors.mobile}
                    />                      
                    <TextInput 
                        onChangeText={handleChange('password')}
                        password
                        value={values.password}
                        onBlur={handleBlur('password')}
                        label="Password"
                        error={touched.password && errors.password}                   
                    />  
                    <TextInput 
                        onChangeText={handleChange('passwordConfirm')}
                        password
                        value={values.passwordConfirm}
                        error={touched.passwordConfirm && errors.passwordConfirm}
                        onBlur={handleBlur('passwordConfirm')}
                        label="Confirm Password"                    
                    /> 
                    <Btn underlayColor="#eaeaea"  onPress={()=> this.submitForm(values)}
                        style={{width :  300, height : 46, borderRadius : 3, justifyContent : 'center', alignItems : 'center', backgroundColor : Colors.primaryOrange, marginTop : 24}} >
                        <Text style={{fontSize : 12, color : "#fff" , fontWeight:"500" }} >Register</Text>
                    </Btn>
                </Content>
            </View>

            </BackScreen>
        );
    }
}


export default withSignUpValidation(withAppContext(SignUp))