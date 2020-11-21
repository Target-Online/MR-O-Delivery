import React, { useState, useContext } from 'react';
import { View, ScrollView, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import { Block } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { height } from 'app/client/constants/utils';
import CashIcon from 'app/assets/icons/CashIcon';
import MastercardIcon from 'app/assets/icons/MastercardIcon'
import VerifiedIcon from 'app/assets/icons/VerfiedIcon';
import { TextInput } from 'app/client/components';
import { toastInfo } from 'app/client/utils/notifications';
import { validateEmail } from 'app/client/utils/validattions';
import { set, update } from "app/client/api";
import Summary from './Summary';
import { styles } from './styles';
import PaystackWebView from './PaystackWebView';
import { 
    UsersContext,
    SessionContext, 
    CurrentUserContext,
} from "app/client/Store";
import { sendPushNotifications } from '../../utils/expo-notifications';

export default function Payment(props) {
    const [users] = useContext(UsersContext);
    const [currentUser] = useContext(CurrentUserContext);
    const [request, setRequest] = useContext(SessionContext);
    const [isCashPayment, setCashPayment] = useState(true);
    const [email, setEmail] = useState(currentUser && currentUser.email ? currentUser.email : '');
    const [showPayButton, setShowPayButtonVisible] = useState(false);

    const PaymentOption = ({ children, isSelected }) => (
        <View style={styles.paymentOptionContainer}>
            <View style={[styles.paymentOptionChild , { borderColor: isSelected ? "#20d86d" : "rgba(0,0,0,0.09)"}]}>
                {children}
            </View>
            <View style={styles.verifiedIcon} >
                {isSelected && <VerifiedIcon />}
            </View>
        </View>
    )

    const CashOption = () => request && (
        <View style={styles.cashOptionContainer}>
            <Text style={styles.cashDeliveryNote}> The driver will collect a total of
                <Text style={[styles.cashDeliveryNote, { color: "red" }]}>{` N${request.isPickUp ? request.actualCost : request.actualCost + request.shoppingCost}`}</Text> on delivery.</Text>
            <Text style={styles.cashDeliveryNote} >Please make sure you make the right change with you.</Text>
        </View>
    )

    const onSubmitRequest = () => {
        if(request.isPickUp){
            if(request.isSubmitted) update("requests", request.id, { 
                status: { isWaitingForDriverConfirmation: true }
            });
            else  setRequest({ 
                    ...request, 
                    id: set("requests", {  
                        ...request,
                        isCashPayment: isCashPayment,
                        isCardPayment: !isCashPayment,   
                        status: { isWaitingForDriverConfirmation: true }
                    }), 
                    isSubmitted: true 
            });

            sendPushNotifications(
                users.data.filter(u => u.isActive && u.isDriver && u.isOnline && !u.isBusy),
                'Incoming Request',
                'Pick up request has been logged.'
            )

            props.navigation.navigate("Finding Driver");
        }
        else if(request.isShopping && (isCashPayment || request.isPaymentComplete)){
            update("requests", request.id, {
                currentStep: 3, 
                isCashPayment: isCashPayment,
                isCardPayment: !isCashPayment
            });
            props.navigation.goBack();
        }
    }

    return (
        <ScrollView >
        <Block flex style={styles.container}>
            <LinearGradient style={styles.pageBackgroundColor} colors={['#fff', '#fff', '#FDD39F', '#FB9211', '#FB9211']} />
            <Summary />
            <Block row style={[styles.paymentOptions, { top: request.isShopping ? height / 2.3 : height / 2.7 }]}>
                <TouchableHighlight onPress={() => setCashPayment(false)}>
                    <PaymentOption isSelected={!isCashPayment}>
                        <MastercardIcon />
                    </PaymentOption>
                </TouchableHighlight>
                <TouchableOpacity onPress={() => !request.isPaymentComplete &&  setCashPayment(true)}>
                    <PaymentOption isSelected={isCashPayment}>
                        <CashIcon />
                    </PaymentOption>
                </TouchableOpacity>
            </Block>
            {isCashPayment
                ? <Block row style={styles.paymentActions}>
                    <CashOption />
                </Block>
                : <Block row style={styles.billingEmail}>
                    <TextInput
                        label={'Billing Email'}
                        onClear={() => setEmail("")}
                        onChangeText={value => setEmail(value)}
                        value={email}
                    />
                </Block>
            }
            {isCashPayment || request.isPaymentComplete
                ?  <TouchableHighlight style={styles.continueButton} onPress={() => onSubmitRequest()}>
                        <Block center>
                            <Text style={styles.text}> Continue </Text>
                        </Block>
                    </TouchableHighlight>
                :   <TouchableHighlight 
                            style={[styles.payNow, { backgroundColor: validateEmail(email) ? '#369946' : '#FFCB9D' }]} 
                            onPress={() => validateEmail(email) ? setShowPayButtonVisible(true) : toastInfo('Please enter billing email.')
                        }>
                        <Block center>
                            <Text style={styles.text}> Pay Now </Text>
                        </Block>
                    </TouchableHighlight>
            }
            {showPayButton && (
                <PaystackWebView 
                    email={email}
                    showPayButton={showPayButton}
                    setShowPayButtonVisible={setShowPayButtonVisible}
                    onSubmitRequest={onSubmitRequest}
                />
            )}
        </Block>
        </ScrollView>
    )
}