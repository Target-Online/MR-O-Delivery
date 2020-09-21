import React, { Component, useContext, useState, useEffect } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View, ActivityIndicator } from 'react-native'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import Login from '../screens/login/Login'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import { IUser, withAppContext, IContextProps } from '../AppContext'
import _ from 'lodash'


const AuthStack = () => <Login />

type IProps =  IContextProps  & { user : any; profile : IUser; }

const AppNavigator : any = (props: IProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const {user, currentUser, setCurrentUser , loadingUser ,users }  = props.context;

    const driverCheck = (phoneNumber : string) =>{
      let res = users.data.find(u =>  u.id == phoneNumber && u.isDriver)
      return !_.isEmpty(res)

    }

    useEffect(() => {
      const {currentUser,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;
      const {phoneNumber} = currentUser || {}
    }, []);

    function renderStack(){
      const isDriver = driverCheck(currentUser.phoneNumber)
      return isDriver ? <DriverNavigationStack isDriver={isDriver} /> : <NavigationStack isDriver={isDriver} />
    }

    function renderLoader(){
      return (
        <View style={{flex : 1 , width : "100%" , height : "100%", justifyContent : "center"}}>
            <ActivityIndicator size={"large"} color={Colors.primaryOrange}  />
        </View>
      )
    }

    return [
      <StatusBar backgroundColor ={Colors.focusColor}
        barStyle = 'dark-content'
        hidden = {false}
        key={1}
       />,
        loadingUser ? renderLoader() : currentUser  ? renderStack() : <AuthStack  />
    ]
    
}


export default withAppContext(AppNavigator)

// FIXME: Use Strings and Metrics file. Rmoeve inline styles.
