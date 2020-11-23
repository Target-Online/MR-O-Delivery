import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { Block } from 'galio-framework';
import { getDistance } from 'geolib';

import { onError, toastInfo } from '../utils/notifications'
import materialTheme from '../constants/Theme';
import { SessionContext, CurrentUserContext } from "../Store";
import NewUserScreen from './NewUser';

const query = {
  key: 'AIzaSyBaHGSfahA2b9YS3Pvguelo2yN8heE41cw',
  language: 'en',
}
const { height, width } = Dimensions.get('screen');

export const Home = props => {
  const mapRef = useRef(null);
  const [currentUser] = useContext(CurrentUserContext);
  const [request, setRequest] = useContext(SessionContext);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [fromLocation, setFromLocation] = useState()
  const [toLocation, setToLocation] = useState()
  const [fetchLocationInProgress, setFetchLocationState] = useState(true);
  const [NewUserModalVisible, setNewUserModalVisible] = useState(false);
  const [regionLocation] = useState({
    latitude: 6.1846426,
    longitude: 6.7257889,
    latitudeDelta: 0.01354,
    longitudeDelta: 0.02454
  })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        onError('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setFetchLocationState(false);
    })();
  }, []);

  const fitToSuppliedMarkers = () => mapRef.current.fitToSuppliedMarkers(['fromLocation', 'toLocation']);

  const onNavigate = (requestType, route) => {
    var distance = getDistance(fromLocation, toLocation) / 1000;
    var calculatedCost = Math.round(distance * 100);
    setRequest({
      customer: currentUser,
      fromLocation: fromLocation,
      distanceInKm: distance,
      calculatedCost: calculatedCost,
      actualCost: calculatedCost >= 500 ? calculatedCost : 500,
      toLocation: toLocation,
      requestType: requestType,
      isPickUp: requestType === 'PICK-UP',
      isShopping: requestType === 'SHOPPING',
      parcelDetails: {}
    })

   props.navigation.navigate(route)
  }

  const navigationButton = (requestType, route) => (
      <TouchableOpacity onPress={() => {
        toLocation && fromLocation
        ? onNavigate(requestType, route)
        : toastInfo('Enter location details', 'location-pin')
      }}>
        <Text style={styles.navigationButton} center size={10}>{requestType}</Text>
      </TouchableOpacity>
  )
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={fetchLocationInProgress ? regionLocation : currentLocation}
        style={styles.mapStyle}
        onPress={() => fitToSuppliedMarkers()}
        onMapReady={() => fitToSuppliedMarkers()}
        onLayout={() => fitToSuppliedMarkers()}
      >
        {!fromLocation && (fetchLocationInProgress
          ? <Marker
            coordinate={regionLocation}
            title={'MR O DELIVERY'}
            description={'ASABA'}
            pinColor={'orange'}
          />
          : <Marker
            coordinate={currentLocation}
            title={'ME'}
            description={'Current Location'}
          />
        )}
        {fromLocation && <Marker
          coordinate={fromLocation}
          title={'From'}
          description={'From Location'}
          identifier={'fromLocation'}
        />}
        {toLocation && <Marker
          coordinate={toLocation}
          title={'To'}
          description={'To Location'}
          pinColor={'green'}
          identifier={'toLocation'}
        />}
      </MapView>
      <TouchableOpacity style={styles.overlayTopSearch}>
        <GooglePlacesAutocomplete
          placeholder={'From'}
          currentLocation
          fetchDetails
          styles={{ textInputContainer: styles.textInputContainer, textInput: styles.textInput }}
          onPress={(data, details = null) => {
            setFromLocation({
              ...details,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            });
            fitToSuppliedMarkers();
          }}
          query={query}
        />
        <GooglePlacesAutocomplete
          placeholder='To'
          currentLocation
          fetchDetails
          styles={{ textInputContainer: styles.textInputContainer, textInput: styles.textInput }}
          onPress={(data, details = null) => {
            setToLocation({
              ...details,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            });
            fitToSuppliedMarkers();
          }}
          query={query}
        />
      </TouchableOpacity>
      <Block row space="around" style={styles.overlayBottomButton}>
        {navigationButton('SHOPPING', 'Shopping')}
        {navigationButton('PICK-UP', 'Parcel Details')}
      </Block>
      {currentUser && (
        <NewUserScreen
            isVisible={NewUserModalVisible}
            setVisible={setNewUserModalVisible}
        />
    )}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayBottomButton: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.99,
  },
  overlayTopSearch: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'white',
    width: width - 30,
  },
  mapStyle: {
    width: width,
    height: height,
  },
  navigationButton: {
    paddingVertical: 20,
    backgroundColor: materialTheme.COLORS.PRIMARY,
    color: "white",
    paddingHorizontal: 60,
    borderRadius: 10,
    fontSize: 12
  },
  textInputContainer: {
      backgroundColor: materialTheme.COLORS.PRIMARY,
  },
  textInput: {
      color: materialTheme.COLORS.PRIMARY,
  }
});
