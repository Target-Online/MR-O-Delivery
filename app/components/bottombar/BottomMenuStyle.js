import { StyleSheet } from 'react-native'
import { Colors , Metrics } from '../../constants'
import { iPhoneLarge } from '../../utils/screenSize'

export default StyleSheet.create({
  base: {
    alignItems: 'center',
    backgroundColor: Colors.bottom_menu_background,
    flexDirection: 'row',
    height: 53,
    justifyContent: 'center',
    width: '100%'
  },
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginRight: 2,
    paddingVertical : Metrics.base 

  },
  blocker: {
    backgroundColor: Colors.blackout,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },

  circleIcon:{
    height : 50,
    width : 50
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height:  64 ,
    justifyContent: 'center',
    borderTopLeftRadius :  8,
    borderTopRightRadius :  8,
    paddingBottom : iPhoneLarge ? Metrics.base * 3.5 : Metrics.base * 2.125,
    paddingTop: Metrics.base * 2,
    zIndex :10,
    ...shadow
  },

  containerBlocker:{
    left :0,
    right: 0,
    top : 0
  },

  logoBlock: {
    alignItems: 'center',
    bottom: 10,
    position: 'absolute',
    width: '100%',
    zIndex : 2
  },

  roundButton: {
    // position: 'relative',
    // bottom: -50
  },

  roundButtonContainer: {
    alignItems: 'center',
    bottom: 0,
    height: 300,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0
  },

  underline: {
    height:4,
    width : 100
  }
})
