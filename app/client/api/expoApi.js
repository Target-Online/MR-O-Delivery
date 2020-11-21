export const sendPushNotifications = notifications =>
    fetch(`https://exp.host/--/api/v2/push/send`,
        {
            method: 'POST',
            body: JSON.stringify(notifications),
            headers: {
                'Content-Type': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'host': 'exp.host',
                'accept': 'application/json'
            }
        }).then((response) => response.json())

export default sendPushNotifications;