import { ActivityIndicator, Image, StatusBar, Modal, View } from 'react-native'
/**
 * React Native App
 * Everthing starts from the App
 */
import React, { Component, useState, useEffect, createContext, useContext } from 'react'
import Navigator from './navigation'
import AuthNav from './screens/user/Auth'
import { auth } from 'firebase'
import AppContextProvider, { withAppContext, AppContext, ContextConsumer, IContextProps } from './AppContext'
import AlertModal from './components/AlertModal'
import ForgotPassword from './screens/user/Auth/ForgotPassword'


type IProps = IContextProps

console.disableYellowBox = true
const App : React.SFC<IProps> = (props) => {

    const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = props.context;
    // setShowAlert(true)
    return(
      <View style={{flex : 1}}>
        <AlertModal/>
        <Navigator />
      </View>
    )
   

}

const AppComp : React.SFC = () => {

  return (
    <AppContextProvider>  
    <ContextConsumer>
      {(c) => {
          return<App context={c} />
      }}
      </ContextConsumer>  
    </AppContextProvider>
  )
}


export default withAppContext(AppComp)
