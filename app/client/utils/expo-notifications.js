import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as api from '../api';
import * as expoApi from '../api/expoApi';
import { toastError } from './notifications';

export const registerForPushNotificationsAsync = async user => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            toastError('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        toastError('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if(user.expoToken != token) api.update('users', user.id, { expoToken: token });
}

export const sendPushNotifications = (users, title, message) => {
    var notifications = [];
    users.map((user) => {
        user.expoToken && notifications.push({ "to": user.expoToken, "title": title, "body": message, "sound": "default" });
    });
    expoApi.sendPushNotifications(notifications);
}