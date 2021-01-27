import React, { Component } from 'react'
import { ActivityIndicator,StyleSheet, Modal,View } from 'react-native'
import { Text } from '../../../components'
import styles from '../../../components/text/styles'
import { Colors, Fonts } from '../../../constants'

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
        <View style={[styles.wrapper, {backgroundColor: noOverlay ? Colors.white : Colors.overlayLight90} ]}>
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

const styles = StyleSheet.create({
  wrapper :{ 
    paddingTop : 24 ,position: 'absolute',
    zIndex: 10, justifyContent: 'center', 
    alignItems : 'center',flex: 1, width : '100%', height : '100%' }
})

export default Loading
