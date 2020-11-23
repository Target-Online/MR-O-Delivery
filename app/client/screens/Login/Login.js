import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Images } from '../../constants';
import { HeaderHeight } from '../../../constants/utils';
import PhoneSignin from './PhoneSignIn';
import EmailSignIn from './EmailSignIn';

const { height } = Dimensions.get('screen');

export default props => (
  <Block flex style={styles.container}>
    <StatusBar barStyle="light-content" />
    <Block flex>
      <ImageBackground
        source={Images.loginBackground}
        style={styles.backgroundImage}
      />
      <Block style={styles.padded}>
        <Block middle>
          <Image source={Images.MROLogo} style={styles.MROLogo} />
        </Block>
        <Block>
          {Platform.constants.Release <= 5.1 
            ? <EmailSignIn {...props} />
            : <PhoneSignin {...props} />
          }
        </Block>
        <Block middle row style={{ marginTop: height / 7 }}>
          <Text color="white" size={16}>
            Coded by
          </Text>
          <Image
            source={Images.TargetOnlineLogo}
            style={styles.TargetOnlineLogo}
          />
        </Block>
      </Block>
    </Block>
  </Block>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 2,
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  backgroundImage: {
    flex: 1, 
    height: height, 
    zIndex: 1,
    opacity: 0.5
  },
  MROLogo: { 
    width: '100%', 
    height: height * 0.22, 
    resizeMode: 'contain',
    bottom: 0, 
    position: 'absolute'
  },
  TargetOnlineLogo: {
    height: 50,
    width: 50,
    marginLeft: theme.SIZES.BASE
  }
});
