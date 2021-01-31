
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight as Btn} from 'react-native'
import { Image } from 'components'
import images from 'assets/images'
import TextInput from "components/TextInput"
import { withAppContext } from '../../../AppContext'
import BackScreen from 'layouts/BackScreen'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { updateUser } from 'api/authApi'
import {profileLoadStyles as styles } from "./styles"
import strings from 'constants/strings'

interface IProps {
    title?: string;
    signIn(): () => void;
}

type FormProps = IProps & StackScreenProps<{ navigation: any }>

const ProfileLoad: React.FunctionComponent<FormProps> = (props: any) => {
    const [displayName, setDisplayName] = useState('');
    const { context :{ currentUser, setCurrentUser }, setVisible } = props

    return (
        <BackScreen
            title={strings.profileLoadTitle}
            onBackPress={() => { setVisible(false)}}
        >
            <View style={styles.wrapper}>
                <Image width={150} height={150} source={images.logo} />
                <Text style={{ marginBottom: 24 }}> Hi {currentUser && currentUser.phoneNumber}</Text>
                    <TextInput
                        keyboardType={'text'}
                        onChangeText={(value) => setDisplayName(value)}
                        value={displayName} label="Name"
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

            </View>
        </BackScreen>
    );
}

export default withAppContext(ProfileLoad)