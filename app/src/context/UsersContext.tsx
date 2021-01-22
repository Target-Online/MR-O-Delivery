import { createContext, useState, useEffect, useReducer } from "react";
import  * as firebase from "firebase"
import React from "react";
import _ from "lodash";
export const UsersContext = createContext({});
import * as api from "../api/index";
import * as rootReducer from "@utils/rootReducer";
import { IUser, IAppContext } from "src/types";
import * as Notifications from 'expo-notifications';
import { O2A } from "object-to-array-convert";

export const UserContextConsumer = UsersContext.Consumer
export type IContextProps = { context : IAppContext }

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
})
  
require('firebase/firestore')

const initalState = {
    data: [],
    search: "",
    inProgress: true,
}

const UsersContextProvider : React.SFC = ({children}) => {

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState<any>({})
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [loadingUser, setLoadingUser] = useState(true)
  const [users, setUsers] =  useReducer(rootReducer.setStateReducer, initalState)
  const [drivers, setDrivers] = useState<IUser[]>([])
  const [verificationId, setVerificationId] = useState<string>("")

  const storeUser = (user : IUser) => {
    if (user) {
        var dbUser = users.data.find((u: any) => u.id == user.phoneNumber)
        dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);            
    }
  }

  const reloadData = () =>{
      setLoadingUser(true)
      api.getCollection("users", setUsers, () =>{ })
      setLoadingUser(false)
  }

  useEffect(() => {
      setLoadingUser(true)
      reloadData()
      var ref = firebase.database().ref("users");
      ref.on('value', function(snapshot : any) {
        const  user = firebase.auth().currentUser
        setUsers({ type: "setData", data: O2A(snapshot) })
        storeUser(user)
      })
      
      firebase.auth().onAuthStateChanged((user: any) => {   
        storeUser(user)      
        Notifications.getExpoPushTokenAsync().then((data)=>{
            const token = data.data
            if (user){
              firebase.database().ref(`/users/`).child(user.phoneNumber).update({expoToken : token})
            }
        }).catch(e =>{})
        setTimeout(()=> setLoadingUser(false) , 3000)           
      })
  }, [users.inProgress])
        

    
  const updateUserProfile = ( id: string, updatedUser:  IUser ) => {
      firebase.database().ref(`users/${id}`).update(updatedUser).then((ref: any)=>{
      }).catch((err: any) => {})
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
      return (drivers.filter(driver => driver.phoneNumber === phoneNumber ).length > 0)
  }

  const updateDriverStatus = ( update : { key :[string] ; value : boolean}) => {
    if(currentUser){
      firebase.database().ref(`/users/`).child(currentUser.phoneNumber)
      .update({...update}).then((snapshot: any) => { }).catch((err: any)=>{ })
    }
  }

  const toggleDriverAvailability = (phoneNumber : string, updatedDriverState : IUser) => {
      firebase.database().ref(`/users/`).child(phoneNumber).set({...updatedDriverState})
      .then((snapshot: any) => { }).catch((err: any)=>{});
  }

  return (
      <UsersContext.Provider
        value={{ 
            user,setUser,reloadData, toggleDriverAvailability, isUserDriver,
            updateUserProfile,profile,setProfile,updateDriverStatus,
            currentUser, setCurrentUser, loadingUser,users, setUsers,
            verificationId, setVerificationId, storeUser,
        }}
      >
        {children}
      </UsersContext.Provider>
  )
};

export default UsersContextProvider


export const withUsersContext = (Component : React.FC) => {

    const Wrapper : React.SFC = (props) => (
        <UserContextConsumer>
            {(context: any) =>(
                <Component {...props} context={context} />
            )}
        </UserContextConsumer>
    )

    return Wrapper
}
