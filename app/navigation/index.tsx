import React, { Component, useContext, useState, useEffect } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View, ActivityIndicator } from 'react-native'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import Login from '../screens/login/Login'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import { IUser, withAppContext, IContextProps } from '../AppContext'
import { CurrentUserContext } from '../Store';
import moment from 'moment'


const AuthStack = () => <Login />

type IProps =  IContextProps  & { user : any; profile : IUser; }

const AppNavigator : any = (props: IProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [isDriver, setIsUserDriver] = useState<boolean>(false);
    const {user, currentUser, setCurrentUser , loadingUser ,setUser,login ,profile, register, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;

    useEffect(() => {
      const {currentUser,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;
      const {phoneNumber} = currentUser || {}
      console.log({currentUser})
      const isDriver = false //isUserDriver(phoneNumber)//true
      setIsUserDriver(isDriver)

    }, []);

    function renderStack(){
      return isDriver ? <DriverNavigationStack /> : <NavigationStack />
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
