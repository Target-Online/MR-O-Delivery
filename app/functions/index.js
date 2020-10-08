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

    const orderId = evt.params.orderId
    console.log("order Id",  orderId)
    console.log("here's the new data ",  snap.val())
    snap.ref.update({
        newTing : "Well this is the object you added"
    })
    var messages = []
    const expoToken = "ExponentPushToken[vzKJbwE1inzvm5qSwtsTa7]"
    messages.push({
        "to" : expoToken,
        "body" : "New Node Added"
    })

    return fetch("https://exp.host/--/api/v2/push/send",{
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(messages)
    })
    // const root = event.data.ref.root


    //return main promise
    // return root.child('/users').once('value').then((snap)=>{

    //     snap.forEach((childSnapshot)=>{
    //         var expoToken = childSnapshot.val().expoToken
    //         if(expoToken){  // && order Id equals id and user is driver
            
    //             messages.push({
    //                 "to" : expoToken,
    //                 "body" : "New Node Added"
    //             })
    //         }
    //     })

    //         return Promise.all(messages)
    //     }).then((messages)=>{

    //         return fetch("https://exp.host/--/api/v2/push/send",{
    //             method : "POST",
    //             headers : {
    //                 "Accept" : "application/json",
    //                 "Content-Type" : "application/json"
    //             },
    //             body : JSON.stringify(messages)
    //         }
            
    //         )

    //     }).catch((e)=>{
    //         throw e
    //     })
})

exports.testNotif = functions.https.onCall((data) =>{

    const expoToken = "ExponentPushToken[vzKJbwE1inzvm5qSwtsTa7]"
    // const root = event.data.ref.root
    var messages = []
    messages.push({
        "to" : expoToken,
        "body" : "New Node Added"
    })

    fetch("https://exp.host/--/api/v2/push/send",{
                method : "POST",
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(messages)
     })
    //return main promise
    // return root.child('/users').once('value').then((snap)=>{

    //     snap.forEach((childSnapshot)=>{
    //         var expoToken = childSnapshot.val().expoToken
    //         if(expoToken){  // && order Id equals id and user is driver
            
    //             messages.push({
    //                 "to" : expoToken,
    //                 "body" : "New Node Added"
    //             })
    //         }
    //     })

    //         return Promise.all(messages)
    //     }).then((messages)=>{

    //         return fetch("https://exp.host/--/api/v2/push/send",{
    //             method : "POST",
    //             headers : {
    //                 "Accept" : "application/json",
    //                 "Content-Type" : "application/json"
    //             },
    //             body : JSON.stringify(messages)
    //         }
            
    //         )

    //     }).catch((e)=>{
    //         throw e
    //     })
})