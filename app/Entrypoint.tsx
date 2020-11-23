import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import Navigator from './navigation'
import AppContextProvider, { withAppContext, ContextConsumer, IContextProps } from './AppContext'
import AlertModal from './components/AlertModal'
import Store from './Store'
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
      {(c) => <App context={c} /> }
      </ContextConsumer>  
    </AppContextProvider>
    </Store>
  )
}

export default withAppContext(AppComp)
