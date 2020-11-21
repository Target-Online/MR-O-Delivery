console.disableYellowBox = true;

import React from 'react';
import { Platform, StatusBar, Image } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import * as Font from 'expo-font';
import GlobalFont from 'react-native-global-font'

import { Images, products, materialTheme } from './constants/';

import { NavigationContainer } from '@react-navigation/native';
import Screens from './client/navigation/Screens';
import Store from "./client/Store";

// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map(product => assetImages.push(product.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {    
      GlobalFont.applyGlobal("QuicksandbookobliqueRegular")

      return (
        <NavigationContainer>
          <GalioProvider theme={materialTheme}>
            <Block flex>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Store><Screens /></Store>
            </Block>
          </GalioProvider>
        </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
      Font.loadAsync({
        'QuicksandlightobliqueRegular': require('./assets/fonts/QuicksandlightobliqueRegular.otf'),
        'QuicksandbookobliqueRegular': require('./assets/fonts/QuicksandbookobliqueRegular.otf'),
        'galioExtra': require('./assets/fonts/galioExtra.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
