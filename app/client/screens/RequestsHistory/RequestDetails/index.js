import React, { useContext, useEffect } from "react";
import moment from "moment";
import { ScrollView, Image, TouchableOpacity, Text, View, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import StepIndicator from 'react-native-step-indicator';
import { Block } from "galio-framework";

import ParcelDelivered from 'app/assets/icons/ParcelDelivered'
import ParcelIcon from 'app/assets/icons/ParcelIcon'
import ChatIcon from 'app/assets/icons/ChatIcon'
import CallIcon from 'app/assets/icons/CallIcon'
import { Images } from "app/client/constants";
import { width } from 'app/client/constants/utils';
import materialTheme from 'app/client/constants/Theme';
import { pickUpSteps, shoppingSteps, customStyles } from './constants';
import { RequestsContext, CurrentUserContext, SessionContext } from "app/client/Store";
import Rating from '../../Rating';
import { styles } from './styles';

const RequestsDetails = props => {
    const [requests] = useContext(RequestsContext);
    const [currentUser] = useContext(CurrentUserContext);
    const [, setCurrentRequest] = useContext(SessionContext);
    const [ratingModalVisible, setRatingModalVisible] = React.useState(false);
    const request = requests.data.find(r => r.id === props.route.params.request.id);

    useEffect(() => {
        if (request && request.status.isComplete) {
            if (currentUser.isDriver && !request.customerRating && !request.customerRating != 0) setRatingModalVisible(true)
            if (!currentUser.isDriver && !request.driverRating && request.driverRating != 0) setRatingModalVisible(true)
        }
        setCurrentRequest(request)
    }, [request])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ width: width, flex: 1 }} >
                <Block center>
                    <Text style={styles.orderTrackHeader}>Request Status</Text>
                </Block>
                <View style={{ paddingTop: 50 }}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={request.currentStep}
                        labels={request.isPickUp ? pickUpSteps : shoppingSteps}
                        stepCount={request.isPickUp ? 3 : 5}
                    />
                    {request.isPickUp
                        ? <View style={{ alignItems: 'center', paddingTop: 50 }}>
                            {(request.currentStep == 3) ? <ParcelDelivered /> : <ParcelIcon width={80} height={80} />}
                            {(request.currentStep === 2) && <Text style={styles.deliveryStep} >Package delivered.</Text>}
                            {(request.currentStep === 1) && <Text style={styles.deliveryStep} >Package collected, driver on route to deliver.</Text>}
                            {(request.currentStep == 0) && <Text style={styles.deliveryStep} >Request accepted, driver on route to collect your package.</Text>}
                        </View>
                        : <View style={{ alignItems: 'center', paddingTop: 50 }}>
                            {(request.currentStep == 5) ? <ParcelDelivered /> : !request.status.driverHasConfirmedPrices && <ParcelIcon width={80} height={80} />}
                            {(request.currentStep == 4) && <Text style={styles.deliveryStep} >Shopping complete, driver on the way to deliver.</Text>}
                            {(request.currentStep == 3) && <Text style={styles.deliveryStep} >Shopping in progress ...</Text>}
                            {(request.currentStep == 2) && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentRequest(request);
                                        props.navigation.navigate('Payment')
                                    }}
                                    style={[styles.button, { width: width * 0.84, backgroundColor: materialTheme.COLORS.SUCCESS }]}>
                                    <Text size={20} bold color='white'>Payment</Text>
                                </TouchableOpacity>
                            )}
                            {(request.currentStep == 1) && <Text style={styles.deliveryStep}>Driver to confirmed prices.</Text>}
                            {(request.currentStep == 0) && <Text style={styles.deliveryStep}>A driver has accepted your order, heading to shopping center.</Text>}
                        </View>
                    }
                </View>
            </View>
            <View style={styles.requestInfoContainer}>
                {currentUser.isDriver
                    ? <View style={styles.driverInfoContainer}>
                        <Image source={request.customer.photoUrl ? { uri: request.customer.photoUrl } : Images.photoPlaceHolder} style={styles.driverPhoto} />
                        <View style={{ padding: 20 }}>
                            <Text style={styles.driverDetails} >{request.customer.displayName}</Text>
                            <Text style={styles.driverDetails} >{request.customer.phoneNumber}</Text>
                        </View>
                        <View style={styles.driverContactActions}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Chat', { request: request })} style={styles.driverContactAction}>
                                <ChatIcon />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${request.driver.phoneNumber}`)} style={styles.driverContactAction}>
                                <CallIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    : <View style={styles.driverInfoContainer}>
                        <Image source={request.driver.photoUrl ? { uri: request.driver.photoUrl } : Images.photoPlaceHolder} style={styles.driverPhoto} />
                        <View style={{ padding: 20 }}>
                            <Text style={styles.driverDetails} >{request.driver.displayName}</Text>
                            <Text style={styles.driverDetails} >{request.driver.vehicleRegistration}</Text>
                        </View>
                        <View style={styles.driverContactActions}>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Chat', { request: request })} style={styles.driverContactAction}>
                                <ChatIcon />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${request.driver.phoneNumber}`)} style={styles.driverContactAction}>
                                <CallIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <View style={styles.locationsPriceTimeStamp}>
                    <View style={styles.locationsDetails}>
                        <View style={styles.locationArrow}>
                            <View style={[styles.locationArrowHead, { borderRadius: 5 }]} />
                            <View style={styles.locationArrowLine} />
                            <View style={styles.locationArrowHead} />
                        </View>
                        <View style={{ height: 60 }}>
                            <View style={styles.textAreaStyles} >
                                <Text style={{ fontSize: 10 }}>
                                    {request.fromLocation.formatted_address}
                                </Text>
                            </View>
                            <View style={styles.textAreaStyles} >
                                <Text style={{ fontSize: 10 }}>
                                    {request.toLocation.formatted_address}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.priceAndDate}>
                    {request && (request.status.driverHasConfirmedPrices || request.isPickUp) &&
                        <React.Fragment>
                            <Text bold>{`N${request.isPickUp ? request.actualCost : request.actualCost + request.shoppingCost}`}</Text>
                            <Text>{' | '}</Text>
                        </React.Fragment>
                    }
                    <Text>{moment(request.createdAt).format("DD MMM YYYY HH:mm")}</Text>
                    {request && (request.isCashPayment || request.isCardPayment) && (
                        <React.Fragment>
                            <Text>{' | '}</Text>
                            <Text>{request.isCashPayment ? 'CASH' : 'CARD'}</Text>
                        </React.Fragment>
                    )}
                </View>
            </View>
            {ratingModalVisible && (
                <Rating
                    request={request}
                    isVisible={ratingModalVisible}
                    setVisible={setRatingModalVisible}
                />
            )}
            <LinearGradient style={styles.lineGradient} colors={['#fff', '#fff', '#FDD39F', '#FB9211', '#FB9211']} />
        </ScrollView>
    );
}

export default RequestsDetails;
