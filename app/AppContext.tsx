import { createContext, useState, Component, useEffect, useReducer, useRef } from "react";
import  * as firebase from "firebase"
import React from "react";
import { IAlertProps } from "./components/AlertModal";
import {Alert} from 'react-native'
import _ from "lodash";
export const AppContext = createContext({});
import * as api from "./api/index";
import * as rootReducer from "./utils/rootReducer";
import { IUser,IOrder, IAppContext } from "types";
import moment from "moment";
import * as Notifications from 'expo-notifications';
import { initAudio, initSound ,playSound } from "./api/audioApi";
import { O2A } from "object-to-array-convert";
import { registerForPushNotificationsAsync , sendPushNotification } from "api/notifications";

export const ContextConsumer = AppContext.Consumer
export type IContextProps = { context : IAppContext}

require('firebase/firestore')

const initalState = {
    data: [],
    search: "",
    inProgress: true,
};

const AppContextProvider : React.SFC = ({children}) => {

        const [user, setUser] = useState(null)
        const [profile, setProfile] = useState<any>({})
        const [alertBoxData , setAlertData] = useState<IAlertProps>({  text: "string",buttons : [ {label : "Test",onPress : ()=>{}} ],title : "test title",})
        const [showAlert , setShowAlert] = useState<boolean>(false)
        const [expoPushToken, setExpoPushToken] = useState('')
        const [currentUser, setCurrentUser] = useState<IUser>()
        const [loadingUser, setLoadingUser] = useState(true)
        const [order, setOrder] = useState({})
        const [userInRating, setUserInRating] = useState({})
        const [ratingsVisible, setRatingsVisible] = useState<boolean>(false)
        const [users, setUsers] =  useReducer(rootReducer.setStateReducer, initalState)
        const [orders, setOrders] = useReducer(rootReducer.setStateReducer, initalState)
        const [drivers, setDrivers] = useState<IUser[]>([])
        const notificationListener = useRef()
        const responseListener = useRef()
        const [verificationId, setVerificationId] = useState<string>("")
        const [orderNumber, setOrderNumber] = useState('')
        const generateOrderId = (userId : string) => randomNum() + userId 

        const storeUser = (user) => {
            if (user) {
                var dbUser = users.data.find((u: any) => u.id == user.phoneNumber)
                dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);            
            }
        }

        const reloadData = () =>{
            setLoadingUser(true)
            api.getCollection("users", setUsers, () =>{ })
            api.getCollection("orders", setOrders)
            setLoadingUser(false)
        }

        useEffect(() => {
            initAudio()
            initSound()
            setLoadingUser(true)
            reloadData()
            firebase.database().ref("users").on('value', function(snapshot) {
                const  user = firebase.auth().currentUser
                setUsers({ type: "setData", data: O2A(snapshot) })
                storeUser(user)
            });

            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token)
            })
           
            firebase.auth().onAuthStateChanged((user: any) => {   
                storeUser(user)      
                Notifications.getExpoPushTokenAsync().then((data)=>{
                    if (user){
                        firebase.database().ref(`/users/`).child(user.phoneNumber).update({
                        expoToken : data.data})
                    }
                }).catch(e =>{})
                setTimeout(()=> setLoadingUser(false) , 3000)           
            })
            
            return () => {
                Notifications.removeNotificationSubscription(notificationListener);
                Notifications.removeNotificationSubscription(responseListener);
                // disableSound()
            };
          }, [users.inProgress])

        const logout = () => {
            firebase.auth().signOut().then((res: any)=> { setCurrentUser(null) }).catch((err: { userInfo: { NSLocalizedDescription: string | undefined; }; }) => {
                Alert.alert("Error", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])
            }) 
        }

        const getAllDrivers = () => {
            firebase.database().ref(`/users/`).once('value').then((snapshot: { val: () => any; }) => {
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
            return drivers.some(driver => driver.phoneNumber === phoneNumber )
        }
        
        const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
            firebase.database().ref(`/orders/`).child(orderId).update({...updatedOrder}).then((snapshot: any) => {  
                    setOrder(snapshot.val())             
                }).catch((err: any)=>{ });
        }

        const updateDriverStatus = ( update : { key :[string] ; value : boolean}) => {
            firebase.database().ref(`/users/`).child(currentUser?.phoneNumber)
            .update({...update}).then(() => { }).catch((err: any)=>{ })
        }

        const toggleDriverAvailability = (phoneNumber : string, updatedDriverState : IUser) => {
            firebase.database().ref(`/users/`).child(phoneNumber).set({...updatedDriverState}).then((snapshot: any) => {              
            }).catch((err: any)=>{ });
        }
      
        const sendRequest = async (id : string , theOrder: IOrder, onSuccess : () => void ,onFailure : () => void ) => {
            const orderID = (id)
            setOrder(theOrder)
            setOrderNumber(orderID)
            firebase.database().ref(`orders/`).child(orderID).set({...theOrder,createdAt : moment(new Date()).toString()})
            .then((snapshot: any) => {  onSuccess() })
            .catch((err: any)=>{ onFailure() });
        }

        const updateUserProfile = ( id : string, updatedUser :  IUser ) => {
            firebase.database().ref(`users/${id}`).update(updatedUser).then((ref: any)=>{}).catch((err: any) => {})
        }

        const driverCheck = (phoneNumber : string) => users.data.some((u : IUser) =>  u.id == phoneNumber && u.isDriver)

        return (
            <AppContext.Provider
                value={{ 
                    user, showAlert, setShowAlert,updateOrderStatus,driverCheck,
                    ratingsVisible, setRatingsVisible,
                    alertBoxData, setAlertData, setUser,sendRequest,orderNumber,
                    logout,isUserDriver,reloadData,setOrderNumber,
                    isDev : true,order,setOrder,drivers,getAllDrivers,generateOrderId,
                    updateUserProfile,profile,setProfile,updateDriverStatus,
                    currentUser, setCurrentUser , loadingUser,users, setUsers,
                    orders, setOrders, toggleDriverAvailability, sendPushNotification,
                    verificationId, setVerificationId, playSound, storeUser,
                    userInRating, setUserInRating
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