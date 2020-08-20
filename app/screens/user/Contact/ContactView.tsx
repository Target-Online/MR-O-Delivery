import React, {
  Component
} from 'react'
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  WebView
} from 'react-native'
import { connect } from 'react-redux'

import { ClearBrochuresReqFeed, RequestBrochures, sendRequestBrochuresList } from '../../../actions/appActions'
import Images from '../../../assets/images'
import { Image, Text } from '../../../components'
import { Colors, Fonts, Metrics } from '../../../constants'

import styles from './styles'

class ContactView extends Component {
  constructor (props) {
    super(props)
        
  }
    state={
      modalVisible : false,
      webModalVisible : false,
      showBrochureModal : false,
      checkedBrochures : null,
      userEmail : null
    }

    componentWillMount (){
      const { initFetch } = this.props
      initFetch()
    }
    validateEmail (email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }


    onSendPress (){
      const { sendBrochureList , userEmail } = this.props
      const { checkedBrochures }  = this.state

      if(!checkedBrochures){
        Alert.alert(
          'Brochure Request',
          'Please Choose Something',
          [
            { text: 'OK', onPress: () =>{} }
          ],
          { cancelable: false },
        )
        return
      }
      if(!userEmail || !this.validateEmail(userEmail)){
        Alert.alert(
          'Brochure Request',
          'Please Enter A Valid E-mail Address',
          [
            { text: 'OK', onPress: () =>{} }
          ],
          { cancelable: false },
        )
        return
      }
      checkedBrochures && userEmail && sendBrochureList(checkedBrochures , userEmail)
      Alert.alert(
        'Brochure Request',
        `An email with the brochures has been sent to ${userEmail}`,
        [
          { text: 'OK', onPress: () =>{
            this.setState({ showBrochureModal : false })
          } }
        ],
        { cancelable: false },
      )
      
    }

    render () {
      return null
    }
}

const mapDispatchToProps = dispatch => ({
  sendBrochureList: (list , userEmail) => dispatch(sendRequestBrochuresList(list, userEmail)),
  clearRequestFDB: () => dispatch(ClearBrochuresReqFeed()),
  initFetch: () => dispatch(RequestBrochures())
  
})
const mapStateToProps = state => ({
  state : state,
  brochures : state.dataReducer.brochures,
  brochureRequestFeedBack : state.dataReducer.brochureRequestFeedBack,
  userEmail : state.dataReducer.userEmail
})
  
export default connect(mapStateToProps,mapDispatchToProps)(ContactView)

const viewPolicy = () => { Linking.openURL('http://draglobal.com')}
const emailLink = ()=>{ Linking.openURL('mailto: info@draglobal.com')}

// FIXME: Move emails and websites to the constants file. Remove inline styles. Use Strings file.
