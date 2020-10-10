import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Dimensions, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { withAppContext, IAppContext, IOrder, mockOrder } from '../../AppContext';
import Images from '../../assets/images'
import Icons from '../../assets/icons'
import { Text } from '..'
import { Colors, Fonts, Metrics }from '../../constants'
import { iPhoneLarge } from '../../utils/screenSize'
import styles from './BottomMenuStyle'
import { useNavigationState, StackActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import _ from 'lodash';
const activeFont =  iPhoneLarge ? Fonts.captionBold : Fonts.tinyBold
const inactiveFont = iPhoneLarge ? Fonts.caption : Fonts.tiny


type IProps = IAppContext & StackNavigationProp;

interface IState {
  currentNav?: string;
}

class BottomMenu extends Component<IProps, IState> {

  _nav (navString: any){
    this.props.navigation.navigate(navString) 
    // if (["Home","Profile","Receipts"].includes(navString)) {
    //   this.props.navigation.dispatch(StackActions.pop(2))
    // }
    this.setState({currentNav: navString}) 
  }

  driverCheck = (phoneNumber : string) =>{
    const { context : {users , currentUser} } = this.props
 
    let res = users.data.find(u =>  u.id == phoneNumber && u.isDriver)
    return !_.isEmpty(res)
  }
  bottomButton (inactiveIcon: {} | null | undefined, activeIcon: {} | null | undefined , navString: string) {
    
    const { navigation } = this.props
    const state = navigation.dangerouslyGetState()
    const { index } = state
    const  key = state.routeNames[index]
    let active = (navString === key)

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => this._nav(navString)}
      >
        <View style={styles.baseButton}>
          {active ? activeIcon: inactiveIcon}        
          <Text color={active ? Colors.primaryOrange : '#7D7D7D'}
            font={active ? activeFont : inactiveFont}
            numberOfLines={1}>{navString.toUpperCase()}
          </Text>        
        </View>
      </TouchableOpacity>
    )
  }

  render () {  
    const { context : {users , currentUser} } = this.props
    const isDriver = this.driverCheck(currentUser.phoneNumber)
    return (
      <View  style={styles.container}>
        {this.bottomButton(<Icons.HomeIcon fill={Colors.overlayDark20}/>,<Icons.HomeIcon fill={Colors.primaryOrange}/>,'Home')}
        {!isDriver && this.bottomButton(<Icons.ReceiptIcon fill={Colors.overlayDark20}/>,<Icons.ReceiptIcon fill={Colors.primaryOrange}/>, 'Receipts')}
        {this.bottomButton(<Icons.ProfileIcon fill={Colors.overlayDark20}/>,<Icons.ProfileIcon fill={Colors.primaryOrange}/>, 'Profile')}            
      </View>
    )
  }
}

export default withAppContext(BottomMenu)
