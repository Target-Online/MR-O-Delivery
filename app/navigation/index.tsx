import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View } from 'react-native'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import Login from '../screens/login/Login'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import AlertModal from '../components/AlertModal'
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IUser, withAppContext, IContextProps } from '../AppContext'

const AuthStack = () => <Login />

type IProps =  IContextProps  & { user : any; profile : IUser; }

class AppNavigator extends Component<IProps> {

    barPosition = new Animated.Value(0)
    barcodePosition = new Animated.Value(0)

    state = {
      isDriver : false
    }
    componentWillMount = () => {

      const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context;

      const {phoneNumber} = user || {}
  
      const isDriver = isUserDriver(phoneNumber)//true
      this.setState({isDriver})

    }

    renderStack(){
    
      const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context;
      const {isDriver} = this.state

      if(isDriver ||  true){

        return(
          <DriverNavigationStack
            // ref={navigatorRef => {
            //   NavigationService.setTopLevelNavigator(navigatorRef)
            // }}
          />
        )
      }

      return(
        <NavigationStack
          // ref={navigatorRef => {
          //   NavigationService.setTopLevelNavigator(navigatorRef)
          // }}
        />
      )  
    }

    render () {

      const {user,setUser,login ,profile, register, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context;

      return [
        <StatusBar backgroundColor ={Colors.focusColor}
          barStyle = 'dark-content'
          hidden = {false}
          key={1}
          translucent = {true}/>,
          user  ? this.renderStack() : <AuthStack  />

      ]
    }
}




export default withAppContext(AppNavigator)

// FIXME: Use Strings and Metrics file. Rmoeve inline styles.
