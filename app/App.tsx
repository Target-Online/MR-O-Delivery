import React from 'react';
import { AppRegistry, Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { Images, articles, nowTheme } from '@constants';
import Entrypoint from './Entrypoint';
import appsettings from "./appsettings.json";
import * as firebase from "firebase";

if (!firebase.apps.length)
  firebase.initializeApp(appsettings[appsettings.environment].firebaseConfig);
// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  // async componentDidMount() {
  //   Font.loadAsync({
  //     'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
  //     'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
  //   });

  //   this.setState({ fontLoaded: true });
  // }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        // <NavigationContainer>
          <GalioProvider theme={nowTheme}>
            <Block flex>
              <Entrypoint />
            </Block>
          </GalioProvider>
        // </NavigationContainer>
      );
    }
  }

  _loadResourcesAsync = async () => {
    // await Font.loadAsync({
    //   'montserrat-regular': require('@assets/font/Montserrat-Regular.ttf'),
    //   'montserrat-bold': require('@assets/font/Montserrat-Bold.ttf')
    // });

    // this.setState({ fontLoaded: true });
    // return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}
AppRegistry.registerComponent('main',() => App);

export default App