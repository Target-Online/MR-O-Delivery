export const sendPushNotification = async =>() {
    await Notifications.presentNotificationAsync({
            title: "New incoming request",
            body: '',
            // data: { data: 'goes here' }
    })
}
  
export const registerForPushNotificationsAsync = async =>() {
    let token;

    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
        }
        if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        
    } else {
        // alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    } 
    return token
}