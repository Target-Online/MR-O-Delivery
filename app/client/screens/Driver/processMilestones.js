import { update } from '../../api';
import { toastInfo } from '../../utils/notifications';
import { sendPushNotifications } from '../../utils/expo-notifications';

export function packageCollected(busyWithRequest) {
    update('requests', busyWithRequest.id, { currentStep: 1 });

    sendPushNotifications([busyWithRequest.customer], 'Pickup Request',
            'Package collected, driver on the way to deliver.')
}

export function shoppingComplete(busyWithRequest) {
    if (!busyWithRequest.status.driverHasConfirmedPrices) {
        toastInfo('Please confirm shopping prices first.')
    }
    else if (!busyWithRequest.isCashPayment && !busyWithRequest.isCardPayment) {
        toastInfo('Please wait for customer payment...')
    }
    else {
        update('requests', busyWithRequest.id, {
            currentStep: 4,
            status: {
                ...busyWithRequest.status,
                shoppingComplete: true,
                shoppingInProgress: false
            }
        });
        sendPushNotifications([busyWithRequest.customer], 'Shopping Request',
            'Shoping complete, driver on the way to deliver')
    }
}

export function arrivedAtShoppingCenter(busyWithRequest) {
    update('requests', busyWithRequest.id, {
        currentStep: 1,
        status: {
            ...busyWithRequest.status,
            driverAtShoppingCenter: true,
            shoppingInProgress: true,
            driverOnShoppingRoute: false
        }
    });
    sendPushNotifications([busyWithRequest.customer], 'Shopping Request',
            'Driver has arrived at shopping center')
}

export function shoppingDelivered(
    busyWithRequest, 
    setCurrentRequest, 
    setRatingModalVisible,
    currentUser
) {
    setCurrentRequest(busyWithRequest);
    update('requests', busyWithRequest.id, {
        currentStep: 5,
        status: {
            ...busyWithRequest.status,
            isComplete: true,
            inProgress: false,
            shoppingDelivered: true
        }
    });
    update('users', currentUser.id, { isBusy: false });

    sendPushNotifications([busyWithRequest.customer], 'Shopping Request',
            'Shopping delivered, please rate the driver.')

    setRatingModalVisible(true);
}

export function packageDelivered(
    busyWithRequest, 
    setCurrentRequest, 
    setRatingModalVisible,
    currentUser
) {
    setCurrentRequest(busyWithRequest);
    update('requests', busyWithRequest.id, {
        currentStep: 3,
        status: {
            ...busyWithRequest.status,
            inProgress: false,
            isComplete: true
        }
    });
    update('users', currentUser.id, { isBusy: false });

    sendPushNotifications([busyWithRequest.customer], 'Pickup Request',
            'Package delivered, please rate the driver.')

    setRatingModalVisible(true);
}