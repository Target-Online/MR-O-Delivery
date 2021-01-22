import firebase from "firebase"
import _ from "lodash"
import { useState, useReducer } from "react"
import { IUser, IOrder } from "src/types"
import * as rootReducer from "@utils/rootReducer";
import * as api from "../api";

const initalState = {
    data: [],
    search: "",
    inProgress: true,
}
const [drivers, setDrivers] = useState<IUser[]>([])
const [users, setUsers] =  useReducer(rootReducer.setStateReducer, initalState)
const [currentUser, setCurrentUser] = useState<IUser>()

export const getAllDrivers = () => {
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

export const updateOrderStatus = (orderId : string, updatedOrder : IOrder) => {
    firebase.database()
    .ref(`/orders/`).child(orderId)
    .update({...updatedOrder})
    .then((snapshot: any) => {  
            setOrder(snapshot.val())             
        }).catch((err: any)=>{                  

    });
}

export const isUserDriver = (phoneNumber : string) =>{
    getAllDrivers()
    let isDriver = drivers.filter(driver => driver.phoneNumber === phoneNumber ).length > 0
    return isDriver
}
export const updateDriverStatus = ( update : { key :[string] ; value : boolean}) => {
    const {phoneNumber} = currentUser
    firebase.database().ref(`/users/`).child(phoneNumber)
    .update({...update}).then((snapshot: any) => {  
                  
    }).catch((err: any)=>{                  
    })
}

export const updateUserProfile = ( id : string, updatedUser :  IUser ) => {
    firebase.database().ref(`users/${id}`).update(updatedUser).then((ref: any)=>{
    }).catch((err: any) => {})
}


export  const driverCheck = (phoneNumber : string) => {
    let res = users.data.find((u :  IUser) =>  u.id == phoneNumber && u.isDriver)
    return !_.isEmpty(res)
}

export const reloadData = () =>{
    // setLoadingUser(true)
    api.getCollection("users", setUsers, () =>{ })
    api.getCollection("orders", setOrders)
    // setLoadingUser(false)
}


export const persistCurrentUser = (user : IUser) =>  setCurrentUser(user)
export const getCurrentUser = () =>  currentUser
export const updateAllUsers = (data : any) =>  setUsers(data)

export  const storeUser = (user : IUser) => {
    if (user) {
        var dbUser = users.data.find((u: any) => u.id == user.phoneNumber)
        dbUser ? setCurrentUser(dbUser) : setCurrentUser(user);            
    }
}
