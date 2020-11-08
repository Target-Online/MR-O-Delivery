import { ActivityIndicator, Image, StatusBar, Modal, View } from 'react-native'
import React, { Component, useState, useEffect, createContext, useContext } from 'react'
import Navigator from './navigation'
import AppContextProvider, { withAppContext, AppContext, ContextConsumer, IContextProps } from './AppContext'
import AlertModal from './components/AlertModal'
import Store from './Store'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import NoConnection from './components/NoConnection'
import RatingsModal from './components/RatingsModal'
import  Colors  from './constants/colors'

type IProps = IContextProps

console.disableYellowBox = true
class App extends React.Component<IProps>{

  state = {
    loading : false
  }

  componentDidMount(){
    const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context
    this.setState({loading : true})
    this.setState({loading : false})
  }

  renderInitialLoading = () => {
    <View style={{flex : 1}} >
      <ActivityIndicator size="large" color={Colors.primaryOrange} />
     </View>
  }

  render(){
    const { loading } = this.state 
    
    return(
      <View style={{flex : 1}}>
        <AlertModal/>
        <RatingsModal />
        <NoConnection />
        {loading ? this.renderInitialLoading() : <Navigator />}
      </View>
    )
  }
}

const AppComp : React.SFC = () => {

  return (
    <Store>
    <AppContextProvider>  
    <ContextConsumer>
      {(c) => {
          return<App context={c} />
      }}
      </ContextConsumer>  
    </AppContextProvider>
    </Store>
  )
}


export default withAppContext(AppComp)
