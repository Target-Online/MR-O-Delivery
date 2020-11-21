import React, { useContext } from 'react';
import PaystackWebView from 'react-native-paystack-webview';

import { SessionContext, CurrentUserContext } from "app/client/Store";
import appsettings from "app/appsettings.json";
import { toastInfo } from 'app/client/utils/notifications';

export default function PayNow({
    email,
    showPayButton,
    setShowPayButtonVisible,
    onSubmitRequest
}) {
    const [currentUser] = useContext(CurrentUserContext);
    const [request, setRequest] = useContext(SessionContext);

    const setPayment = payment => {
        setRequest({ 
            ...request, 
            payment: payment, 
            isPaymentComplete: payment.status == 'success' 
        });
        setShowPayButtonVisible(false)
        onSubmitRequest();
    }

    return (
        <PaystackWebView
            showPayButton={showPayButton}
            paystackKey={appsettings[appsettings.environment].paystackKey}
            amount={request.isPickUp ? request.actualCost : request.actualCost + request.shoppingCost}
            billingEmail={email}
            billingMobile={currentUser.id}
            refNumber={'' + Math.floor((Math.random() * 1000000000) + 1)}
            billingName={currentUser.displayName}
            channels={JSON.stringify(["card", "bank"])}
            ActivityIndicatorColor='green'
            SafeAreaViewContainer={{ marginTop: 5 }}
            SafeAreaViewContainerModal={{ marginTop: 5 }}
            handleWebViewMessage={(e) => toastInfo(e.message)}
            onCancel={(response) => setPayment(response)}
            onSuccess={(response) => setPayment(response)}
            autoStart={true}
        />
    )
}


