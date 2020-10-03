import { createContext, useState, Component, useEffect, useReducer, useRef } from "react";
import  * as firebase from "firebase"
import React from "react";
import { IAlertProps } from "./components/AlertModal";
import {Alert} from 'react-native'
import _ from "lodash";
export const AppContext = createContext({});
import * as api from "./api/index";
import * as rootReducer from "./utils/rootReducer";
import { IOrder } from "screens/user/PickUp";
import { IUser, IDriver, IAppContext } from "types";
import moment from "moment";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { initAudio } from "./api/audioApi";
import { Audio } from 'expo-av'

export const ContextConsumer = AppContext.Consumer
export type IContextProps = {
    context : IAppContext
}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  

require('firebase/firestore')
const initalState = {
    data: [],
    search: "",
    inProgress: true,
  };

const AppContextProvider : React.SFC = ({children}) => {

        const [user, setUser] = useState(null);
        const [sound, setSound] = useState()
        const [profile, setProfile] = useState<IUser>({});
        const [alertBoxData , setAlertData] = useState<IAlertProps>({  text: "string",buttons : [ {label : "Test",onPress : ()=>{}} ],title : "test title",})
        const [showAlert , setShowAlert] = useState<boolean>(false)
        const [expoPushToken, setExpoPushToken] = useState('');
        const [notification, setNotification] = useState(false);
        const [currentUser, setCurrentUser] = useState();
        const [loadingUser, setLoadingUser] = useState(true);
        const [order, setOrder] = useState({});
        const [users, setUsers] = useReducer(rootReducer.setStateReducer, initalState);
        const [orders, setOrders] = useReducer(rootReducer.setStateReducer, initalState);
        const [drivers, setDrivers] = useState<IDriver[]>([]);
        const notificationListener = useRef();
        const responseListener = useRef();
        const [verificationId, setVerificationId] = useState<string>("");
        const soundObject = new Audio.Sound();

        const generateOrderId = (userId : string) => {
            const Id = randomNum() + userId 
            return Id
        }

        const storeUSer = (user) => {
            console.log(user!==null)
            if (user) {
                var dbUser = users.data.find((u: any) => u.id == user.phoneNumber);
                console.log("num ", user.phoneNumber)
                console.log(dbUser)
                dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);            
            }
        }

        useEffect(() => {

            // async function initSound() {
            //     try {
            //         await soundObject.loadAsync(require('./assets/audio/notif_tone.mp3')); 
            //       } catch (error) { // An error occurred!
            //     }
            // }

            // async function disableSound() {
            //     try {
            //         await soundObject.unloadAsync();
            //       } catch (error) { // An error occurred!
            //     }
            // }

            // initSound()
            setLoadingUser(true)
            api.getCollection("users", setUsers);
            api.getCollection("orders", setOrders);
            storeUSer(currentUser)
            firebase.auth().onAuthStateChanged((user: any) => {
                storeUSer(user)           
                setTimeout(()=> {setLoadingUser(false)}, 3000)           
            })
            registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                //setNotification(notification);
                console.log({notification})
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
                // disableSound()
            };
          }, [])

        // const notify = async () => {
        //     await soundObject.playAsync()
        // }
    
        const logout = () => {
            firebase.auth().signOut().then((res: any)=> {
                setCurrentUser(null) 
            }).catch((err: { userInfo: { NSLocalizedDescription: string | undefined; }; }) => {
                console.error(err)
                Alert.alert("Error", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])
            }) 
        }

        const getAllDrivers = () => {
            firebase.database().ref(`/users/`)
                .once('value').then((snapshot: { val: () => any; }) => {
                    let users = snapshot.val() 
                    let drivers = []
                    for (var id in users){
                        if(users.hasOwnProperty(id)){
                            const user = users[id]
                            if (user.isDriver){
                                drivers.push(user)
                            }
                        }}
                    setDrivers(drivers)                   
                    }).catch((err: any)=>{return {}})
        }

        const isUserDriver = (phoneNumber : string) =>{
            getAllDrivers()
            let isDriver = drivers.filter(driver => driver.phoneNumber === phoneNumber ).length > 0
            return isDriver
        }
        
        const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
            const {status} = updatedOrder
            firebase.database()
            .ref(`/orders/`).child(orderId)
            .update({...updatedOrder})
            .then((snapshot: any) => {  
                    setOrder(snapshot.val())             
                }).catch((err: any)=>{                  
                    console.log(" failed to update")
            });
        }

        const updateDriverStatus = (status : string) => {
            const {phoneNumber} = currentUser
            firebase.database().ref(`/users/`).child(phoneNumber)
            .update({status}).then((snapshot: any) => {  
                              
            }).catch((err: any)=>{                  
                console.log(" failed to update")
            })
        }

        const toggleDriverAvailability = (phoneNumber : string, updatedDriverState : IDriver) => {
            firebase.database().ref(`/users/`).child(phoneNumber)
            .set({...updatedDriverState})
            .then((snapshot: any) => {   
                // console.log(snapshot)               
            }).catch((err: any)=>{          
                    console.log(" failed to update")
            });
        }
      
        const fetchUserProfile = async (uid : string) => {

            firebase.database().ref(`/users/${uid}`)
                .once('value')
                .then((snapshot: { val: () => any; }) => {
                    let userProfile = snapshot.val() 
                    const hasProfile = !_.isEmpty(userProfile)
                    hasProfile && setProfile(userProfile)
                    return userProfile
                }).catch((err: any)=>{
                    return {}
            });


        }

        const sendRequest = async (id : string , theOrder: IOrder, onSuccess : () => void ,onFailure : () => void ) => {
            const orderID = (id)
            setOrder(theOrder)
            firebase.database()
                .ref(`orders/`).child(orderID)
                .set({...theOrder,
                    createdAt : moment(new Date()).toString()
                })
                .then((snapshot: any) => {
                    onSuccess()
            
                }).catch((err: any)=>{
                    onFailure()
            });
        }

        async function sendPushNotification() {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "New incoming request",
                    body: '',
                    data: { data: 'goes here' }
                },
                trigger: { seconds: 2 }
            })
        }
          
        async function registerForPushNotificationsAsync() {
            let token;
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;
                // console.log(token);
            } else {
                alert('Must use physical device for Push Notifications');
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

        const updateUserProfile = ( params: {profile : IUser, silentUpdate?: boolean, 
            newUser?: boolean ,onSuccess : () => void , onFailure : () => void }) => {
            const {profile , silentUpdate, newUser,onSuccess,onFailure } = params
            const {phoneNumber} = profile
            if(newUser){
                const newRef = firebase.database().ref(`users/`).child(phoneNumber)
                newRef.set({...profile}).then(()=>{
                    setProfile(profile)
                    onSuccess && onSuccess()
                }).catch(()=>{
                    onFailure && onFailure()
                })    
            }
            else{
                firebase.database().ref(`users/${phoneNumber}`).update(profile).then((ref: any)=>{

                }).catch((err: any) => {
                })
            }

            if(!silentUpdate){
                setAlertData({ text: "Your details have been updated" ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Success",})
                setShowAlert(true)
            }
        }

        const register = (values: { email: string; password: string, firstname : string, lastname : string } ) => {

            firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((res: any) =>{ 
                const {firstname , lastname, email} = values
                updateUserProfile({firstname , lastname, email,profilePicURL : "" },true,true)
            }
            ).catch((err: { userInfo: { NSLocalizedDescription: any; }; }) =>{
                setAlertData({ text: err.userInfo.NSLocalizedDescription ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Registration Failed",})
                setShowAlert(true)
            })           
        }

        const resetPassword = (email : string) => {
            firebase.auth().sendPasswordResetEmail(email).then((res: any) => {        
                setAlertData({ text: `A password reset e-mail has been sent to ${email}`,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Success",})
                setShowAlert(true)

            }).catch((err: { userInfo: { NSLocalizedDescription: any; }; })=>{
                
                setAlertData({ text: err.userInfo.NSLocalizedDescription ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Error",})
                setShowAlert(true)
            })
        }

        const driverCheck = (phoneNumber : string) =>{
            let res = users.data.find(u =>  u.id == phoneNumber && u.isDriver)
            return !_.isEmpty(res)
        }

        const login = (values: { email: string; password: string, firstname : string }) => {

            firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((res: any) => {
                fetchUserProfile(values.email)
                
            }).catch((err: { userInfo: { NSLocalizedDescription: string | undefined; }; }) => {

                Alert.alert("Login Failed", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])

            })
        }

        return (
            <AppContext.Provider
                value={{ 
                    user, showAlert, setShowAlert,updateOrderStatus,driverCheck,
                    alertBoxData, setAlertData, setUser,sendRequest,
                    login, register, logout, fetchUserProfile,isUserDriver,
                    isDev : true,order,setOrder,drivers,getAllDrivers,generateOrderId,
                    resetPassword, updateUserProfile,profile,setProfile,updateDriverStatus,
                    currentUser, setCurrentUser , loadingUser,users, setUsers,
                    orders, setOrders, toggleDriverAvailability, sendPushNotification,
                    verificationId, setVerificationId
                }}
            >
                {children}
            </AppContext.Provider>
        )

  };

export default AppContextProvider


export const withAppContext = (Component : React.Component) => {

    const Wrapper : React.SFC = (props) => (
        <ContextConsumer>
            {(context: any) =>(
                <Component {...props} context={context} />
            )}
        </ContextConsumer>
    )

    return Wrapper
}

const randomNum = () =>  Math.floor(Math.random() * Math.floor(100));
export const mockOrder =  {
    "customer" : {
      "email" : "menc9@coo9.com",
      "displayName" : "Customer Name",
      "lastname" : "TEst Last",
      "profilePicURL" : ""
    },
    "driver" : {
        "email" : "menc9@coo9.com",
        "displayName" : "Driver Name",
        "lastname" : "TEst Last",
        "phoneNumber" : "+27611801505",
        "profilePicURL" : ""
      },
    "dropOffAddress" : {
      "description" : "Washington, DC, USA,hcuytudduydiuydydydyiudyidyidydyy",
      "addressComponents" : [ {
        "name" : "Washington",
        "shortName" : "Washington",
        "types" : [ "locality", "political" ]
      }, {
        "name" : "District of Columbia",
        "shortName" : "District of Columbia",
        "types" : [ "administrative_area_level_2", "political" ]
      }, {
        "name" : "District of Columbia",
        "shortName" : "DC",
        "types" : [ "administrative_area_level_1", "political" ]
      }, {
        "name" : "United States",
        "shortName" : "US",
        "types" : [ "country", "political" ]
      } ],
      "location" : {
        "latitude" : 38.9071923,
        "longitude" : -77.0368707
      },
      "name" : "Washington",
      "placeID" : "ChIJW-T2Wt7Gt4kRKl2I1CJFUsI",
      "priceLevel" : -1,
      "types" : [ "locality", "political" ],
      "viewport" : {
        "latitudeNE" : 38.995548,
        "latitudeSW" : 38.7916449,
        "longitudeNE" : -76.909393,
        "longitudeSW" : -77.119759
      },
      "website" : "http://www.dc.gov/"
    },
    "items" : [ {
      "description" : "We’re",
      "name" : "Something here"
    } ],
    "orderId" : "testID681",
    "orderType" : "Pick-Up",
    "pickUpAddress" : {
      "description" : "Dubai - United Arab Emirates, hvvyiyuduydduyttctycycuycycctycyucuycyu",
      "addressComponents" : [ {
        "name" : "Dubai",
        "shortName" : "Dubai",
        "types" : [ "locality", "political" ]
      }, {
        "name" : "Dubai",
        "shortName" : "Dubai",
        "types" : [ "administrative_area_level_1", "political" ]
      }, {
        "name" : "United Arab Emirates",
        "shortName" : "AE",
        "types" : [ "country", "political" ]
      } ],
      "location" : {
        "latitude" : 25.2048493,
        "longitude" : 55.2707828
      },
      "name" : "Dubai",
      "placeID" : "ChIJRcbZaklDXz4RYlEphFBu5r0",
      "priceLevel" : -1,
      "types" : [ "locality", "political" ],
      "viewport" : {
        "latitudeNE" : 25.3585607,
        "latitudeSW" : 24.7921359,
        "longitudeNE" : 55.5650393,
        "longitudeSW" : 54.89045429999999
      }
    },
    "status" : "pending",
    "paymentMethod" : "cash",
    "distance" : "22",
    "total" : 1250
  }