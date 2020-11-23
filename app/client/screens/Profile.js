import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, View, ScrollView, ActivityIndicator, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { CurrentUserContext, RequestsContext } from '../Store';
import RequestDetailsCard from '../screens/Driver/Card';
import { _updateUserAvatar } from '../utils/imageUtils';
import { toastInfo } from '../utils/notifications';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Profile(props) {
  const [requests] = useContext(RequestsContext);
  const [currentUser] = useContext(CurrentUserContext);
  const [newPhotoUrl, setNewPhotoUrl] = useState();
  const [photoUpdateInProgress, setPhotoUpdateStatus] = useState(false);

  const currentUserRequests = requests.data.filter(request => request.customer.id === currentUser.id)
  const recentRequest = currentUserRequests.reverse()[0];
  const shoppingRequests = currentUserRequests.filter(request => request.isShopping);
  const pickupRequests = currentUserRequests.filter(request => request.isPickUp);

  useEffect(() => {
    if (!currentUser.photoUrl) toastInfo('Update your photo by tapping on the placeholder.')
    return
  }, [])

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <TouchableNativeFeedback style={styles.barsIcon} onPress={() => props.navigation.openDrawer()}>
          <Icon size={25} name="bars" family="font-awesome" style={styles.barsIcon} />
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={() => _updateUserAvatar(setNewPhotoUrl, currentUser, setPhotoUpdateStatus)}>
          <ImageBackground
            source={newPhotoUrl
              ? { uri: newPhotoUrl }
              : currentUser.photoUrl
                ? { uri: currentUser.photoUrl }
                : Images.photoPlaceHolder
            }
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            {currentUser &&
              <Block flex style={styles.profileDetails}>
                <Block style={styles.profileTexts}>
                  <Text color="white" size={28} style={{ paddingBottom: 8 }}>{currentUser.displayName}</Text>
                  <Block row space="between">
                    <Block row center>
                      {currentUser.averageRating >= 2.5 && (
                        <Block middle style={styles.pro}>
                          <Text size={16} color="white">Pro</Text>
                        </Block>
                      )}
                      <Text color="white" size={16} muted style={styles.seller}>User</Text>
                      {currentUser.averageRating && (
                        <Text size={16} color={materialTheme.COLORS.WARNING}>
                          {currentUser.averageRating.toFixed(2)}{' '}
                          <Icon name="shape-star" family="GalioExtra" size={14} />
                        </Text>
                      )}
                    </Block>
                    {currentUser.address &&
                    <Block>
                      <Text color={theme.COLORS.MUTED} size={16}>
                        <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                        {` ${currentUser.address.formatted_address.split(',')[0]} ${currentUser.address.formatted_address.split(',')[1]}`.substring(0, 19)}
                      </Text>
                    </Block>
                    }
                  </Block>
                </Block>
                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
              </Block>
            }
            {photoUpdateInProgress &&
              <View style={styles.photoUpdateSpinner} >
                <ActivityIndicator style={{ height: '100%' }} size="large" color="#FB9211" />
              </View>
            }
          </ImageBackground>
        </TouchableOpacity>
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>{currentUserRequests.length}</Text>
              <Text muted size={12}>Requests</Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>{shoppingRequests.length}</Text>
              <Text muted size={12}>Shopping</Text>
            </Block>
            <Block middle>
              <Text bold size={12} style={{ marginBottom: 8 }}>{pickupRequests.length}</Text>
              <Text muted size={12}>Pickup</Text>
            </Block>
          </Block>
          <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Recent request</Text>
            <Text size={12} color={materialTheme.COLORS.PRIMARY} onPress={() => props.navigation.navigate('History')}>View All</Text>
          </Block>
          <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
            {currentUserRequests.length > 0
              ? <RequestDetailsCard request={recentRequest} />
              : <Text bold center style={{ marginTop: height * 0.1 }} size={20} color={'#FB9211'}>
                No recent requetest found.
                </Text>
            }
          </Block>
        </ScrollView>
      </Block>
      <LinearGradient
        style={styles.pageBackgroundColor}
        colors={['#fff', '#fff', '#FB9211', '#FB9211']}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  barsIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 120 : 60,
    left: 30,
    zIndex: 1,
    color: materialTheme.COLORS.PRIMARY
  },
  photoUpdateSpinner: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 220 : 150,
    left: width * 0.5,
    zIndex: 1,
    color: materialTheme.COLORS.PRIMARY
  },
  pageBackgroundColor: {
    position: 'absolute',
    borderRadius: 13,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 30,
    zIndex: -1,
  },
});
