import { ActivityIndicator, Image, StatusBar, Modal, View } from 'react-native'
import React, { Component, useState, useEffect, createContext, useContext } from 'react'
import Navigator from './navigation'
import AppContextProvider, { withAppContext, AppContext, ContextConsumer, IContextProps } from './AppContext'
import AlertModal from './components/AlertModal'
import Store from './Store'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

// ...

type IProps = IContextProps

console.disableYellowBox = true
class App extends React.Component<IProps>{

  state = {
    loading : false
  }

  async componentDidMount(){
    const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context
    this.setState({loading : true})
    //fetch drivers and all



    this.setState({loading : false})

  }

  renderInitialLoading = () => {
    <View style={{flex : 1}} >
      <Bubbles size={10} color="#FFF" />
      <Bars size={10} color="#FDAAFF" />
      <Pulse size={10} color="#52AB42" />
      <DoubleBounce size={10} color="#1CAFF6" />
    </View>
  }

  render(){
    const { loading } = this.state 
    const {user,setUser,login ,profile, isUserDriver, setAlertData, alertBoxData, setShowAlert,showAlert }  = this.props.context
    // setShowAlert(true)
    return(
      <View style={{flex : 1}}>
        <AlertModal/>
        {loading ? this.renderInitialLoading() : 
        <Navigator />
        }
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
