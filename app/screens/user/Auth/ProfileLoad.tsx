
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight as Btn} from 'react-native'
import { Content } from 'native-base'
import { Image } from '../../../components'
import images from '../../../assets/images'
import TextInput from "../../../components/TextInput"
import withSignUpValidation, { WithSignUpFormProps } from './withSignUpValidation'
import { Colors } from '../../../constants'
import { withAppContext } from '../../../AppContext'
import BackScreen from '../../../layouts/BackScreen'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { updateUser } from '../../../api/authApi'

interface IProps {
    title?: string;
    signIn(): () => void;
}

type FormProps = IProps & WithSignUpFormProps & StackScreenProps<{ navigation: any }>

const ProfileLoad: React.FunctionComponent<FormProps> = (props: any) => {
    const [displayName, setDisplayName] = useState('');
    const {navigation, context :{ storeUser ,currentUser, setCurrentUser }, onBack, setVisible } = props

    return (
        <BackScreen
            title="Register Your Name"
            onBackPress={() => {
                    setVisible(false)
            }}
        >
            <View style={styles.wrapper}>
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
                                const newCurrent = {...currentUser,displayName}
                                setCurrentUser(newCurrent)

                            }
                           setVisible(false)
                        }}
                        style={styles.saveBtn} >
                        <Text style={styles.submitText} >{displayName.length > 0 ? 'Submit' : 'Later...'}</Text>
                    </Btn>
                </Content>
            </View>
        </BackScreen>
    );
}


export default withSignUpValidation(withAppContext(ProfileLoad))


const styles = StyleSheet.create({
    saveBtn : { 
        width: 300, height: 46,
        borderRadius: 3, justifyContent: 'center', 
        alignItems: 'center', backgroundColor: Colors.primaryOrange, 
        marginTop: 24 
    },
    submitText : { 
        fontSize: 12, color: "#fff", 
        fontWeight: "500" 
    },
    wrapper : { flex: 1, alignItems: 'center', padding: 24 }
})