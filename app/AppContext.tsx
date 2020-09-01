import { createContext, useState, Component, useEffect } from "react";
import  * as firebase from "firebase"
import React from "react";
import { IAlertProps } from "./components/AlertModal";
import {Alert} from 'react-native'
import _ from "lodash";
export const AppContext = createContext({});
export const ContextConsumer = AppContext.Consumer
require('firebase/firestore')
export interface IVehicle {
    registration : string ; 
    brand : string;
    model : string;
  }

export interface IDriver {
    vehicel : IVehicle;
    status : "busy" | "vacant" | "offline"
    address: string;
    createdAt: any;
    displayName: string;
    id: string;
    isActive ?: boolean ;
    isDriver ?: boolean;
    object_key: string;
    phoneNumber: string;
    profilePicURL: string;
    profilePicUrl: string;
    vehicleRegistration: string;
}

interface IAddressComponent { 
    name : string;
    shortName : string;
    types : any[]
}

export interface IAddress {
    address: string;
    addressComponents: IAddressComponent[]
    location: {longitude: number, latitude: number}
    name: string;
    placeID: string ;
    priceLevel: number;
    types: string[]
    viewport: {latitudeNE: number, longitudeSW: number, latitudeSW: number, longitudeNE: number}
    website: string
}
  
export interface IOrder {
    orderId : "Pick-Up" | "Shopping";
    customer : any;
    driver?: IDriver;
    dropOffAddress : IAddress ;
    pickUpAddress : IAddress;
    orderType : any;
    items : any[];
    total : number;
}

export type IContextProps = {
    context : IAppContext
}

export interface IAppContext{
        user : any ;
        drivers : IDriver[];
        profile: IUser;
        showAlert:  boolean;
        order: IOrder;
        isUserDriver : (phoneNumber : string) => boolean ;
        setOrder : (order : IOrder) => void;
        setShowAlert : (newState : boolean) => void ;
        setProfile : (profile : IUser) => void ;
        alertBoxData : IAlertProps ;
        setAlertData : (data : IAlertProps) => void ;
        sendRequest : (id : string , onSuccess : () => void ,onFailure : () => void ) => void ;      
        setUser: (user : any) => void ;
        login: (values: { email: string; password: string, firstname : string }) => void ;
        register: (values: { email: string; password: string, firstname : string } ) => void;
        logout: () => void;
        getAllDrivers: () => void;
        resetPassword : (email : string) => void;
}

export type IUser = {
    email?: string;
    phoneNumber?: number;
    firstname?: string;
    lastname?: string;
    profilePicURL?: string;
}

const AppContextProvider : React.SFC = ({children}) => {

        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [profile, setProfile] = useState<IUser>({});
        const [alertBoxData , setAlertData] = useState<IAlertProps>({  text: "string",buttons : [ {label : "Test",onPress : ()=>{}} ],title : "test title",})
        const [showAlert , setShowAlert] = useState<boolean>(false)
        const [initializing, setInitializing] = useState(true);
        const [orderId, setOrderId] = useState("");
        const [order, setOrder] = useState({});
        const [drivers, setDrivers] = useState<IDriver[]>([]);
        const usersRef =  firebase.firestore().collection('users')
 
        const initialLoad = (word : string) => {

           const {phoneNumber} = user || {}

        }

        const generateOrderId = (userId : string) => {
            const Id = randomNum() + userId 
            return Id
        }

        const onAuthStateChanged = (user: any) => {
            const { phoneNumber } = user
            fetchUserProfile(phoneNumber)
            setUser(user);
            if (initializing) setInitializing(false);
        }
    
        useEffect(() => {
          const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, []);
    
        const logout = () => {
            
            firebase.auth().signOut().then((res)=> {

            }).catch(err => {
                console.error(err)
                Alert.alert("Error", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])
            })
            
        }

        const getAllDrivers = () => {
            firebase.database()
                .ref(`/users/`)
                .once('value')
                .then(snapshot => {
                    let users = snapshot.val() 
                    let drivers = []
                    // console.log({users})
                    for (var id in users){
                        if(users.hasOwnProperty(id)){
                            const user = users[id]
                            if (user.isDriver){
                                drivers.push(user)
                            }                        
                        }                      
                    }
                    setDrivers(drivers)                   
                    }).catch((err)=>{
                        return {

                        }
                })
        }

        const isUserDriver = (phoneNumber : string) =>{
            getAllDrivers()

            console.log({phoneNumber})
            console.log({drivers : drivers.map((d)=> d.phoneNumber)})
            let isDriver = drivers.filter(driver => driver.phoneNumber === phoneNumber ).length > 0
            return isDriver
        }
        
        const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
            firebase.database()
            .ref(`/orders/`).child(orderId)
            .set({...updatedOrder})
            .then(snapshot => {
                    console.log("updated the order ",orderId)
                }).catch((err)=>{
                    
                    console.log(" failed to update")
            });
        }
      
        const fetchUserProfile = async (uid : string) => {

            firebase.database()
                .ref(`/users/${uid}`)
                .once('value')
                .then(snapshot => {
                    let userProfile = snapshot.val() 
                    console.log(" this is the user profile  ", {userProfile})
                    const hasProfile = !_.isEmpty(userProfile)
                    hasProfile && setProfile(userProfile)
                    return userProfile
                }).catch((err)=>{
                    return {}
            });


        }

        const sendRequest = async (id : string , onSuccess : () => void ,onFailure : () => void ) => {
            const orderID = generateOrderId(id)

            const order = {...mockOrder} //for testing purposes
            firebase.database()
                .ref(`orders/`).child(orderID)
                .set({...order})
                .then(snapshot => {
                    onSuccess()
            
                }).catch((err)=>{
                    onFailure()
            });
        }

        const updateUserProfile = ( params: {profile : IUser, silentUpdate?: boolean, 
            newUser?: boolean ,onSuccess : () => void , onFailure : () => void }) => {

            const {profile , silentUpdate, newUser,onSuccess,onFailure } = params
            console.log("==== ssetting" ,{profile})
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
                    firebase.database().ref(`users/${phoneNumber}`).update(profile).then((ref)=>{

                    }).catch((err) => {
                    })
                }

                if(!silentUpdate){
                    setAlertData({ text: "Your details have been updated" ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Success",})
                    setShowAlert(true)
                }
        }

        const register = (values: { email: string; password: string, firstname : string, lastname : string } ) => {

            firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then((res) =>{ 
                const {firstname , lastname, email} = values
                updateUserProfile({firstname , lastname, email,profilePicURL : "" },true,true)
                // setProfile()
            }
            ).catch(err =>{
                setAlertData({ text: err.userInfo.NSLocalizedDescription ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Registration Failed",})
                setShowAlert(true)
            })           
        }

        const resetPassword = (email : string) => {
            firebase.auth().sendPasswordResetEmail(email).then((res) => {        
                setAlertData({ text: `A password reset e-mail has been sent to ${email}`,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Success",})
                setShowAlert(true)

            }).catch((err)=>{
                
                setAlertData({ text: err.userInfo.NSLocalizedDescription ,buttons : [ {label : "Ok",onPress : ()=>{}} ],title : "Error",})
                setShowAlert(true)
            })
        }

        const login = (values: { email: string; password: string, firstname : string }) => {

            firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(res => {
                fetchUserProfile(values.email)
                
            }).catch(err => {

                Alert.alert("Login Failed", err.userInfo.NSLocalizedDescription, [ {text : "Ok",onPress : ()=>{}} ])

            })
        }
 
        // getAllDrivers()
        return (
            <AppContext.Provider
                value={{ 
                    user, showAlert, setShowAlert,updateOrderStatus,
                    alertBoxData, setAlertData, setUser,sendRequest,
                    login, register, logout, fetchUserProfile,isUserDriver,
                    isDev : true,order,setOrder,drivers,getAllDrivers,
                    resetPassword, updateUserProfile,profile,setProfile
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
const mockOrder =  {
    "customer" : {
      "email" : "menc9@coo9.com",
      "firstname" : "Test",
      "lastname" : "TEst Last",
      "profilePicURL" : ""
    },
    "dropOffAddress" : {
      "address" : "Washington, DC, USA",
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
      "name" : "Wrwq"
    } ],
    "orderId" : "testID681",
    "orderType" : "Pick-Up",
    "pickUpAddress" : {
      "address" : "Dubai - United Arab Emirates",
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
    "total" : 1250
  }