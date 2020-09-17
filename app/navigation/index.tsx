import React, { Component, useContext, useState, useEffect } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View, ActivityIndicator } from 'react-native'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import Login from '../screens/login/Login'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import { IUser, withAppContext, IContextProps } from '../AppContext'
import { CurrentUserContext } from '../Store';


const AuthStack = () => <Login />

type IProps =  IContextProps  & { user : any; profile : IUser; }

const AppNavigator : any = (props: IProps) => {



    const [loading, setLoading] = useState<boolean>(false);
    const [isDriver, setIsUserDriver] = useState<boolean>(false);
    const {user,setUser,login ,profile, register, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;
    const [currentUser, setCurrentUser , loadingUser] = useContext(CurrentUserContext);

    useEffect(() => {

      const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;
      const {phoneNumber} = user || {}
      const isDriver =  isUserDriver(phoneNumber)//true
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
        translucent = {true}/>,
        loadingUser ? renderLoader() : currentUser  ? renderStack() : <AuthStack  />

    ]
    
}


export default withAppContext(AppNavigator)

// FIXME: Use Strings and Metrics file. Rmoeve inline styles.
