import React, { Component } from 'react'
import { Alert, Animated, Easing, Image, ImageBackground, Modal, StatusBar, View } from 'react-native'
import { GetAllComms, StartUpAction, RequestBrochures, 
  changeView, clearError,storeMetrics } from '../actions/appActions'
import Images from '../assets/images'
import { Colors, Fonts,Enums, Metrics, Strings } from '../constants'
import { iPhoneLarge } from '../utils/screenSize'
import NavigationStack  from './UserNavigationStack'
import DriverNavigationStack  from './DriverNavigationStack'
import AlertModal from '../components/AlertModal'
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = () => <View />

interface IProps {
  user : any;
}
class AppNavigator extends Component<IProps> {

    barPosition = new Animated.Value(0)
    barcodePosition = new Animated.Value(0)

    renderStack(){
      const isDriver = false//true
      if(isDriver){

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

      const {user} = this.props
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




export default (AppNavigator)

// FIXME: Use Strings and Metrics file. Rmoeve inline styles.
