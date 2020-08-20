import React, {
  Component
} from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  View
} from 'react-native'
import Spinner from 'react-native-spinkit'

import { Cell, Text } from '../../../components'
import { Colors, Fonts, Metrics } from '../../../constants'

class Loading extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { displayText = 'Loading' ,visible, width = '100%', height = '100%' ,noOverlay } = this.props
    return ( 
      <Modal 
        transparent
        animationType={'fade'}
        supportedOrientations={['portrait', 'landscape']}
        visible={visible}
      >
        <View style={{ paddingTop : 24, backgroundColor: noOverlay ? Colors.white : Colors.overlayLight90 ,position: 'absolute',zIndex: 10, justifyContent: 'center', alignItems : 'center',flex: 1, width : '100%', height : '100%' }}>
          {/* <ActivityIndicator size="large" color={Colors.tetiaryGrey} /> */}
          {/* <Spinner
            color={Colors.secondayGreen}
            type={'9CubeGrid'}
          /> */}
          <ActivityIndicator />
          <Text color={Colors.white}
            font={Fonts.button}
            mt={2}>{displayText}
          </Text>
        </View>
      </Modal>
    )
  }
}



export default Loading

// FIXME: Remove inline styles and unused imports

// bold, 
// contentCenter,
// contentLeft,
// contentRight,
// fontCenter,
// fontLeft,
// fontRight,
// imageCenter,
// imageHeight,
// imageLeft,
// imageRight,
// imageWidth,
// numberOfLines,
// textFont,
// textCenter,
// textCenterColor,
// textLeft,
// textLeftColor,
// textRight,
// textRightColor