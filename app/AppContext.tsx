import { createContext, useState, Component, useEffect, useReducer } from "react";
import  * as firebase from "firebase"
import React from "react";
import { IAlertProps } from "./components/AlertModal";
import {Alert} from 'react-native'
import _ from "lodash";
export const AppContext = createContext({});
import * as api from "./api/index";
import * as rootReducer from "./utils/rootReducer";
import { IOrder } from "screens/user/PickUp";
import { IUser, IDriver } from "types";
export const ContextConsumer = AppContext.Consumer


require('firebase/firestore')
const initalState = {
    data: [],
    search: "",
    inProgress: true,
  };

const AppContextProvider : React.SFC = ({children}) => {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [profile, setProfile] = useState<IUser>({});
        const [alertBoxData , setAlertData] = useState<IAlertProps>({  text: "string",buttons : [ {label : "Test",onPress : ()=>{}} ],title : "test title",})
        const [showAlert , setShowAlert] = useState<boolean>(false)
        const [initializing, setInitializing] = useState(true);
        const [orderId, setOrderId] = useState("");
        const [currentUser, setCurrentUser] = useState();
        const [loadingUser, setLoadingUser] = useState(true);
        const [order, setOrder] = useState({});
        const [users, setUsers] = useReducer(rootReducer.setStateReducer, initalState);
        const [orders, setOrders] = useReducer(rootReducer.setStateReducer, initalState);
        const [drivers, setDrivers] = useState<IDriver[]>([]);

        const generateOrderId = (userId : string) => {
            const Id = randomNum() + userId 
            return Id
        }

        const storeUSer = (user ) => {

            if (user) {
                var dbUser = users.data.find((u: any) => u.id == user.phoneNumber);
                dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);            
            }
        }

        useEffect(() => {
            setLoadingUser(true)
            api.getCollection("users", setUsers);
            api.getCollection("orders", setOrders);
            getAllDrivers()
            firebase.auth().onAuthStateChanged((user: any) => {
                storeUSer(user)           
                setTimeout(()=> {setLoadingUser(false)}, 3000)           
            })          
          }, []);
    
    
        const logout = () => {
            
            firebase.auth().signOut().then((res: any)=> {

            }).catch((err: { userInfo: { NSLocalizedDescription: string | undefined; }; }) => {
                console.error(err)
                Alert.alert("Error", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])
            })
            
        }

        const getAllDrivers = () => {
            firebase.database()
                .ref(`/users/`)
                .once('value')
                .then((snapshot: { val: () => any; }) => {
                    let users = snapshot.val() 
                    let drivers = []
                    for (var id in users){
                        if(users.hasOwnProperty(id)){
                            const user = users[id]
                            if (user.isDriver){
                                drivers.push(user)
                            }                        
                        }                      
                    }
                    
                    setDrivers(drivers)                   
                    }).catch((err: any)=>{
                        return {

                        }
                })
        }

        const isUserDriver = (phoneNumber : string) =>{
            getAllDrivers()
            let isDriver = drivers.filter(driver => driver.phoneNumber === phoneNumber ).length > 0
            return isDriver
        }
        
        const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
            firebase.database()
            .ref(`/orders/`).child(orderId)
            .set({...updatedOrder})
            .then((snapshot: any) => {               
                }).catch((err: any)=>{                  
                    console.log(" failed to update")
            });
        }
        const toggleDriverAvailability = (phoneNumber : string, updatedDriverState : IDriver) => {
            firebase.database().ref(`/users/`).child(phoneNumber)
            .set({...updatedDriverState})
            .then((snapshot: any) => {   
                console.log(snapshot)               
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
                .set({...theOrder})
                .then((snapshot: any) => {
                    onSuccess()
            
                }).catch((err: any)=>{
                    onFailure()
            });
        }

        const updateUserProfile = ( params: {profile : IUser, silentUpdate?: boolean, 
            newUser?: boolean ,onSuccess : () => void , onFailure : () => void }) => {

            const {profile , silentUpdate, newUser,onSuccess,onFailure } = params

                const {phoneNumber} = profile
                // usersRef.doc(email).set(profile)

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
                // setProfile()
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
                    user, showAlert, setShowAlert,updateOrderStatus,
                    alertBoxData, setAlertData, setUser,sendRequest,
                    login, register, logout, fetchUserProfile,isUserDriver,
                    isDev : true,order,setOrder,drivers,getAllDrivers,generateOrderId,
                    resetPassword, updateUserProfile,profile,setProfile,
                    currentUser, setCurrentUser , loadingUser,users, setUsers,
                    orders, setOrders, toggleDriverAvailability
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
      "description" : "Washington, DC, USA",
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
      "description" : "Dubai - United Arab Emirates",
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
    "distance" : "22 km",
    "total" : 1250
  }