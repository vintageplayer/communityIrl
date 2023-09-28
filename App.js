import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted.');
        } else {
          console.log('Location permission denied.');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);

  return (
    <Text>
      Latitude: {latitude}{'\n'}
      Longitude: {longitude}
    </Text>
  );

};

export default App;