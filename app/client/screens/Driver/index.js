import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Switch, ImageBackground, Platform, TouchableOpacity, TouchableNativeFeedback, Linking, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../../components';
import { Images } from '../../constants';
import NewUserScreen from '../NewUser';
import materialTheme from '../../constants/Theme';
import { update } from '../../api';
import IncomingRequest from './IncomingRequest';
import RequestDetailsCard from './Card';
import { styles } from './styles';
import DriverToastMessages from './toastMessages';
import Rating from '../Rating';
import { toastInfo } from '../../utils/notifications';
import { _updateUserAvatar } from '../../utils/imageUtils';
import { CurrentUserContext, RequestsContext, UsersContext, SessionContext } from '../../Store';
import { packageCollected, shoppingComplete, arrivedAtShoppingCenter, shoppingDelivered, packageDelivered } from './processMilestones';

const { width, height } = Dimensions.get('screen');

export default function Driver(props) {
    const [currentUser] = useContext(CurrentUserContext);
    const [users] = useContext(UsersContext);
    const [requests] = useContext(RequestsContext);
    const [, setRequest] = useContext(SessionContext);
    const [currentRequest, setCurrentRequest] = useState();
    const [newUserModalVisible, setNewUserModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [newPhotoUrl, setNewPhotoUrl] = useState();
    const [photoUpdateInProgress, setPhotoUpdateStatus] = useState(false);

    const driver = users.data.find(user => user.id === currentUser.id)
    const busyWithRequest = requests.data.find(r => r.status.inProgress && r.driver.id === currentUser.id)
    const targetLocation = busyWithRequest
        ? busyWithRequest.currentStep == 0 ? busyWithRequest.fromLocation : busyWithRequest.toLocation
        : {}

    useEffect(() => {
        if(busyWithRequest) DriverToastMessages(busyWithRequest, targetLocation)
        return
    }, [busyWithRequest])

    useEffect(() => {
        if(!currentUser.photoUrl) toastInfo('Update your photo by tapping on the placeholder.');
        return
    }, [])

    const BackgroundLinearGradient = () => (
        <LinearGradient
            style={styles.pageBackgroundColor}
            colors={['#fff', '#fff', driver.isOnline ? '#FDD39F' : 'gray', '#FB9211', '#FB9211']}
        />
    )

    function _handlePressDirections() {
        const { lat, lng } = targetLocation.geometry.location
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = targetLocation.formatted_address
        const url = Platform.select({ ios: `${scheme}${label}@${latLng}`, android: `${scheme}${latLng}(${label})` }) || ""
        Linking.openURL(url);
    }

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <TouchableNativeFeedback style={styles.navbars} onPress={() => props.navigation.openDrawer()}>
                    <Icon size={25} name="bars" family="font-awesome" style={styles.navbars} />
                </TouchableNativeFeedback>
                <TouchableOpacity onPress={() => _updateUserAvatar(setNewPhotoUrl, currentUser, setPhotoUpdateStatus)}>
                    <ImageBackground
                        source={newPhotoUrl
                            ? { uri: newPhotoUrl }
                            : currentUser.photoUrl
                                ? { uri: currentUser.photoUrl }
                                : Images.photoPlaceHolder
                        }
                        style={styles.profileContainer}
                        imageStyle={styles.profileImage}>
                        <Block flex style={styles.profileDetails}>
                            <Block style={styles.profileTexts}>
                                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{currentUser.displayName}</Text>
                                <Block row space="between">
                                    <Block row center>
                                        {currentUser.averageRating > 2.5 && (
                                            <Block middle style={styles.pro}>
                                                <Text size={16} color="white">Pro</Text>
                                            </Block>
                                        )}
                                        <Text color="white" size={16} muted style={styles.driver}>Driver</Text>
                                        {currentUser.averageRating &&
                                            <Text size={16} color={materialTheme.COLORS.WARNING}>
                                                {currentUser.averageRating.toFixed(2)}{' '}
                                                <Icon name="shape-star" family="GalioExtra" size={14} />
                                            </Text>
                                        }
                                    </Block>
                                    {currentUser.address && currentUser.address.formatted_address &&
                                        <Block>
                                            <Text color={theme.COLORS.MUTED} size={16}>
                                                <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                                                {` ${currentUser.address.formatted_address.split(',')[0]} ${currentUser.address.formatted_address.split(',')[1]}`.substring(0, 19)}
                                            </Text>
                                        </Block>
                                    }
                                </Block>
                            </Block>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                        </Block>
                        {photoUpdateInProgress && (
                            <View style={styles.photoUpdateSpinner} >
                                <ActivityIndicator style={{ height: '100%' }} size="large" color="#FB9211" />
                            </View>
                        )}
                    </ImageBackground>
                </TouchableOpacity>
            </Block>
            <Block flex style={styles.options}>
                <Block row middle space="between" style={styles.rows}>
                    <Text bold>{driver.isOnline ? 'ONLINE' : 'OFFLINE'}</Text>
                    <Switch
                        onValueChange={() => update("users", currentUser.id, { isOnline: !driver.isOnline })}
                        ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
                        thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
                        trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.PRIMARY }}
                        value={driver.isOnline}
                    />
                </Block>
                {busyWithRequest
                    ? <View>
                        {busyWithRequest.isShopping && (
                            <TouchableOpacity
                                onPress={() => {
                                    setRequest(busyWithRequest);
                                    props.navigation.navigate('Shopping List')
                                }}
                                style={[styles.button, { width: width * 0.84, backgroundColor: materialTheme.COLORS.SUCCESS }]}>
                                <Text size={15} bold color='white'>
                                    {busyWithRequest.status.driverHasConfirmedPrices
                                        ? 'Shopping List'
                                        : 'Confirm Shopping List Prices'
                                    }
                                </Text>
                            </TouchableOpacity>
                        )}
                        <RequestDetailsCard request={busyWithRequest} />
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => _handlePressDirections()} style={[styles.button, { backgroundColor: materialTheme.COLORS.PRIMARY }]}>
                                <Text size={15} bold color='white'>Start Navigation</Text>
                            </TouchableOpacity>
                            {busyWithRequest.isPickUp
                                ? <TouchableOpacity
                                    onPress={() => busyWithRequest && busyWithRequest.currentStep === 0
                                        ? packageCollected(busyWithRequest)
                                        : packageDelivered(busyWithRequest, setCurrentRequest, setRatingModalVisible, currentUser)
                                    }
                                    style={[styles.button, { backgroundColor: materialTheme.COLORS.SUCCESS }]}>
                                    <Text size={15} bold color='white'>{busyWithRequest && busyWithRequest.currentStep === 0 ? 'Package Collected' : 'Package Delivered'}</Text>
                                </TouchableOpacity>
                                : busyWithRequest.status.driverOnShoppingRoute
                                    ? <TouchableOpacity onPress={() => arrivedAtShoppingCenter(busyWithRequest)} style={[styles.button, { backgroundColor: materialTheme.COLORS.SUCCESS }]}>
                                        <Text size={15} bold color='white'>@Shopping Center</Text>
                                    </TouchableOpacity>
                                    : <TouchableOpacity
                                        onPress={() => busyWithRequest && busyWithRequest.status.shoppingInProgress
                                            ? shoppingComplete(busyWithRequest)
                                            : shoppingDelivered(busyWithRequest, setCurrentRequest, setRatingModalVisible, currentUser)}
                                        style={[styles.button, { backgroundColor: materialTheme.COLORS.SUCCESS }
                                        ]}>
                                        <Text size={15} bold color='white'>{busyWithRequest && busyWithRequest.status.shoppingInProgress ? 'Shopping Complete' : 'Shopping Delivered'}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    : <Text bold center style={{ marginTop: height * 0.1 }} size={20}>
                        {driver.isOnline && driver.isActive && !driver.isBusy ? 'Accepting Requests' : 'Not Accepting Requests!'}
                    </Text>
                }
                <BackgroundLinearGradient />
            </Block>
            {currentUser && (
                <NewUserScreen
                    isVisible={newUserModalVisible}
                    setVisible={setNewUserModalVisible}
                />
            )}
            {!driver.isBusy && driver.isActive && driver.isOnline && (
                <IncomingRequest {...props} />
            )}
            {ratingModalVisible &&
                <Rating
                    request={currentRequest}
                    isVisible={ratingModalVisible}
                    setVisible={setRatingModalVisible}
                />
            }
            <BackgroundLinearGradient />
        </Block>
    );
}