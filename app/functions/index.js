const functions = require('firebase-functions');
const fetch = require('node-fetch')
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://mr-o-delivery-84f4e.firebaseio.com'
  });

// admin.initializeApp(functions.config().firebase)

exports.sendPushNotification = functions.database.ref('/orders/{orderId}').onCreate((snap,evt) =>{

    const order = snap.val()

    if(order.driver){

        const {expoToken} = order.driver

        console.log(expoToken)
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

// exports.testNotif = functions.https.onCall((data) =>{

//     const expoToken = "ExponentPushToken[vzKJbwE1inzvm5qSwtsTa7]"
//     var messages = []
//     messages.push({
//         "to" : expoToken,
//         "body" : "New Node Added"
//     })

//     fetch("https://exp.host/--/api/v2/push/send",{
//                 method : "POST",
//                 headers : {
//                     "Accept" : "application/json",
//                     "Content-Type" : "application/json"
//                 },
//                 body : JSON.stringify(messages)
//      })
// })