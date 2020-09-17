
import React, { useState } from 'react';
import {
    ScrollView, View,
    Text, TouchableHighlight as Btn
} from 'react-native';
import { Icon, Container, Button, Content, Tabs, Form, Item, Input, ScrollableTab } from 'native-base';
import { Image } from '../../../components';
import images from '../../../assets/images';
import TextInput from "../../../components/TextInput";
import withSignUpValidation, { WithSignUpFormProps } from './withSignUpValidation';
import { Colors } from '../../../constants';
import {withAppContext, IContextProps} from '../../../AppContext';
import BackScreen from '../../../layouts/BackScreen';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { updateUser } from '../../../api/authApi';

interface IProps {
    title?: string;
    signIn(): () => void;
}
type FormProps = IProps & WithSignUpFormProps & StackScreenProps<{ navigation: any }>

const ProfileLoad: React.FunctionComponent<FormProps> = (props: any) => {
    const [displayName, setDisplayName] = useState('');
    const { errors, handleChange, navigation, touched, handleBlur, onBack, values, setVisible, currentUser } = props

    return (
        <BackScreen
            title="Register Your Name"
            onBackPress={() => {
                if (onBack) {
                    return onBack()
                }
                navigation.goBack()
            }}
        >
            <View style={{ flex: 1, alignItems: 'center', padding: 24 }}>
                <Image width={150} height={150} source={images.logo} />
                <Text style={{ marginBottom: 24 }}> Hi  {currentUser && currentUser.phoneNumber}</Text>
                <Content>
                    <TextInput
                        keyboardType={'text'}
                        onChangeText={(value) => setDisplayName(value)}
                        value={displayName}
                        label="Name"
                        onClear={() => setDisplayName('')}
                    />
                    <Btn 
                        underlayColor="#eaeaea" 
                        onPress={() => {
                           if(displayName.length > 0){
                                updateUser(currentUser.phoneNumber, { 'displayName': displayName }) 
                            }
                           setVisible(false)
                        }}
                        style={{ width: 300, height: 46, borderRadius: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primaryOrange, marginTop: 24 }} >
                        <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500" }} >{displayName.length > 0 ? 'Submit' : 'Later...'}</Text>
                    </Btn>
                </Content>
            </View>
        </BackScreen>
    );
}


export default withSignUpValidation(withAppContext(ProfileLoad))