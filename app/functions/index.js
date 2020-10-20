const functions = require('firebase-functions');
const fetch = require('node-fetch')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://mr-o-delivery-84f4e.firebaseio.com'
  });


exports.sendPushNotification = functions.database.ref('/orders/{orderId}').onCreate((snap,evt) =>{

    const order = snap.val()

    if(order.driver){

        const {expoToken} = order.driver

        if(expoToken){
            var messages = []
            messages.push({
                "to" : expoToken,
                "body" : "New Icoming Request"
            })
        
            return fetch("https://exp.host/--/api/v2/push/send",
                        {
                        method : "POST",
                        headers : {
                            "Accept" : "application/json",
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify(messages)
                    })
        }
        return new Promise()
    }

    return new Promise()
})
