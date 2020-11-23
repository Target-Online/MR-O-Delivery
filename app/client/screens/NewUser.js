import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform, ScrollView, Dimensions, Modal } from 'react-native';
import { Input, theme } from 'galio-framework';
import { SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import materialTheme from '../constants/Theme';
import { CurrentUserContext } from "../Store";
import { update } from '../api';

const { height } = Dimensions.get('screen');
const query = {
    key: 'AIzaSyBaHGSfahA2b9YS3Pvguelo2yN8heE41cw',
    language: 'en',
}

const NewUser = ({
    isVisible,
    setVisible
}) => {
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
    const [errorsVisible, setErrorVisible] = useState(false)
    const [userInfo, setUserInfo] = useState({
        displayName: currentUser.displayName ? currentUser.displayName : '',
        email: currentUser.email ? currentUser.email : ''
    });

    const validations = () => {
        if (userInfo.displayName && userInfo.address) return true
        else {
            setErrorVisible(true);
            return false;
        }
    }

    const onSubmit = () => {
        if (validations()) {
            update("users", currentUser.isEmailRegistered ? currentUser.email.replace(/[^+0-9a-z]/gi, '') : currentUser.phoneNumber, userInfo);
            setVisible(false)
            setCurrentUser({ ...currentUser, ...userInfo, isNew: false })
        }
    }

    const displayError = message => errorsVisible && <Text style={styles.inputErrror}>{message}</Text>

    useEffect(() => {
        if (currentUser.isNew || !currentUser.address) setVisible(true);
    }, [])

    return (
        <Modal
            style={[{ flex: 1 }]}
            visible={isVisible}
            animationType="slide"
            transparent={false}
        >
            <ScrollView keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.container}>
                <React.Fragment>
                    <Text style={styles.welcomeUpHeading}>Welcome, {currentUser.displayName ? currentUser.displayName : currentUser.phoneNumber}</Text>
                    <Text style={styles.welcomeMessage}>
                        Wecome to MR O Delivery, the best delivery service in ASABA, please give us few of your details below.
                    </Text>
                </React.Fragment>

                <ScrollView keyboardShouldPersistTaps={'always'} style={{ paddingVertical: 24, minHeight: height * 2 }} >
                    <Input
                        right
                        value={userInfo.displayName}
                        placeholder="Name"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.DEFAULT }}
                        iconContent={<SimpleLineIcons size={16} color={theme.COLORS.ICON} name="user" />}
                        onChangeText={name => setUserInfo({ ...userInfo, displayName: name })}
                    />
                    {!userInfo.displayName && displayError('Enter your name')}
                    {currentUser.isEmailRegistered
                        ? <React.Fragment>
                            <Input
                                right
                                value={userInfo.phoneNumber}
                                placeholder="+234..."
                                color={materialTheme.COLORS.PRIMARY}
                                placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                style={{ borderRadius: 3, color: materialTheme.COLORS.PRIMARY, borderColor: materialTheme.COLORS.DEFAULT }}
                                iconContent={<SimpleLineIcons size={16} color={theme.COLORS.ICON} name="phone" />}
                                onChangeText={phoneNumber => !currentUser.phoneNumber && setUserInfo({ ...userInfo, phoneNumber: phoneNumber })}
                            />
                            {!userInfo.phoneNumber && displayError('Enter phone number')}
                        </React.Fragment>
                        : <Input
                            right
                            value={userInfo.email}
                            placeholder="Email"
                            color={materialTheme.COLORS.PRIMARY}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            style={{ borderRadius: 3, color: materialTheme.COLORS.PRIMARY, borderColor: materialTheme.COLORS.DEFAULT }}
                            iconContent={<SimpleLineIcons size={16} color={theme.COLORS.ICON} name="envelope" />}
                            onChangeText={email => !currentUser.email && setUserInfo({ ...userInfo, email: email })}
                        />
                    }
                    <View style={styles.locationSearchContainer}>
                        <GooglePlacesAutocomplete
                            placeholder={'Address'}
                            fetchDetails
                            currentLocation
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            styles={{ textInputContainer: styles.textInputContainer, textInput: styles.textInput }}
                            onPress={(data, details = null) => setUserInfo({ ...userInfo, address: details })}
                            query={query}
                        />
                    </View>
                    {!userInfo.address && displayError('Enter your address')}
                    <TouchableOpacity onPress={() => onSubmit()} style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
            <LinearGradient style={styles.pageBackgroundColor} colors={['#fff', '#fff', '#FDD39F', '#FB9211', '#FB9211']} />
        </Modal>
    );
}

export default NewUser;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginTop: height * 0.2
    },
    locationSearchContainer: {
        position: 'relative',
        marginVertical: 10,
        backgroundColor: 'white'
    },
    welcomeUpHeading: {
        fontSize: 22, fontWeight: "700",
        color: materialTheme.COLORS.PRIMARY,
        alignSelf: "center",
        marginBottom: 8
    },
    welcomeMessage: {
        fontSize: 12,
        marginTop: 20,
        fontWeight: "400",
        color: "rgba(0,0,0,0.5)",
        textAlign: 'center'
    },
    submitButton: {
        width: "100%",
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: materialTheme.COLORS.PRIMARY,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 40,
        alignItems: 'center'
    },
    submitText: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "600"
    },
    truckIcon: {
        transform: [{ scaleX: -1 }],
        alignSelf: "flex-start",
        marginTop: 8,
        marginBottom: 24
    },
    truckIconContainer: {
        width: "100%",
        height: 140,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    textArea: {
        color: materialTheme.COLORS.PRIMARY,
        textAlignVertical: "top",
        marginTop: theme.SIZES.BASE / 2,
        borderRadius: 3,
        padding: 15,
        backgroundColor: "white",
        paddingTop: Platform.OS === 'ios' ? 15 : 15
    },
    pageBackgroundColor: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: 30,
        zIndex: -1,
    },
    textInputContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: materialTheme.COLORS.DEFAULT
    },
    textInput: {
        height: 30,
        color: materialTheme.COLORS.PRIMARY,
    },
    inputErrror: {
        color: 'red',
        paddingHorizontal: 5
    }
});
