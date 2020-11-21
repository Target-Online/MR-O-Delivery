import React, { useContext, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { materialTheme, Images } from '../constants';
import { CurrentUserContext, UsersContext } from "../Store";
import { registerForPushNotificationsAsync } from '../utils/expo-notifications';
import IncomingRequest from './Driver/IncomingRequest';

const { height, width } = Dimensions.get('screen');

const Onboarding = props => {
  const [users] = useContext(UsersContext);
  const [currentUser, ,userLoading] = useContext(CurrentUserContext);

  const driver = currentUser && users.data.find(user => user.id === currentUser.id)

  useEffect(() => {
    if(currentUser) {
      registerForPushNotificationsAsync(currentUser);
      props.navigation.navigate('App');
    }
  }, [currentUser])

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          resizeMode='contain'
          style={{ height: height, width: width, marginTop: Platform.OS === 'android' ? '-55%' : '-38%', zIndex: 1 }}
        />
      </Block>
      <Block flex space="between" style={styles.padded}>
      <LinearGradient
        colors={['white', '#FB9211', '#FB9211']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
      />
        <Block flex space="around" style={{ zIndex: 2, marginTop: 100 }}>
          {userLoading
            ? <ActivityIndicator style={{ marginTop: userLoading ? 0 : 100 }} size="large" color="white" />
            : (
              <Block row space="around">
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.loginBtn} center size={20}>USER LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                  <Text style={styles.loginBtn} center size={19}>DRIVER LOGIN</Text>
                </TouchableOpacity>
              </Block>
            )}
          <Block center>
            <Text size={10} color='white'>
              Ⓒ‌ ‌‌2020‌ MR O DELIVERY‌ ‌|‌ ‌All‌ ‌Rights‌ ‌Reserved‌
              </Text>
          </Block>
        </Block>
      </Block>
      {driver && !driver.isBusy && driver.isActive && driver.isOnline && (
        <IncomingRequest {...props}/>
      )}
    </Block>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: materialTheme.COLORS.PRIMARY,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  loginBtn: {
    borderColor: 'white',
    color: 'white',
    padding: width * 0.02,
    borderWidth: 2,
    fontFamily: 'galioExtra',
    borderRadius: 10
  }
});
