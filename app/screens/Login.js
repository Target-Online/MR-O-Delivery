import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { Images } from '../constants/';
import { HeaderHeight } from '../constants/utils';

import PhoneSignin from './PhoneSignIn';

const { height, width } = Dimensions.get('screen');

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block style={styles.padded}>
            <Block middle>
              <Image source={Images.MROLogo} style={{ width: 250, height: 124, bottom: 0, position: 'absolute' }} />
            </Block>
            <Block>
              <PhoneSignin {...this.props}/>
            </Block>
            <Block middle row style={{ marginTop: 145, marginBottom: 30 }}>
              <Text
                color="white"
                size={16}
                style={{ fontFamily: 'montserrat-regular' }}
              >
                Coded by
                </Text>
              <Image
                source={Images.TargetOnlineLogo}
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: theme.SIZES.BASE
                }}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 2,
    //position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
