
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
import {withAppContext, IContextProps} from '../../../AppContext';
import BackScreen from '../../../layouts/BackScreen';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
// import firebase from 'firebase'

interface IProps {
    title?: string;
    signIn() : () => void;
}


type FormProps = IProps & IContextProps &  WithSignUpFormProps & StackScreenProps<{navigation : any}>

class ProfileLoad extends React.Component<FormProps> {
  
    state={
        name :null,
        email : null,
        password : null,
        passConfirm : null,
    }

    submitForm = (values: { email: string; lastname: string; phoneNumber : string;   }) => {
        const  { email, lastname, phoneNumber } = values
        console.log({values})

    }

    render(){
        const {errors, handleChange,navigation, touched,handleBlur,context,onBack, values } = this.props
        const {updateUserProfile} = context
        const randomNum =  Math.floor(Math.random() * Math.floor(1000));
      
        return (

            <BackScreen
                title="Register Your Profile"
                onBackPress={()=> {
                    if (onBack){
                        return onBack()
                    }
                    navigation.goBack()
                }}
            >
            <View style={{flex : 1, alignItems : 'center' , padding : 24 }}>
                <Image width={150} height={150} source={images.logo} />

                <Text style={{marginBottom : 24}}> Looks like you're new here :]</Text>



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
                   
                    <Btn underlayColor="#eaeaea"  onPress={()=> this.submitForm(values)}
                        style={{width :  300, height : 46, borderRadius : 3, justifyContent : 'center', alignItems : 'center', backgroundColor : Colors.primaryOrange, marginTop : 24}} >
                        <Text style={{fontSize : 12, color : "#fff" , fontWeight:"500" }} >Submit</Text>
                    </Btn>
                </Content>
            </View>

            </BackScreen>
        );
    }
}


export default withSignUpValidation(withAppContext(ProfileLoad))