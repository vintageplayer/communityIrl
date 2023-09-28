import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

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

  const sendLocationToServer = async () => {
    try {
      const response = await axios.post('https://webhook.site/90efd798-cb95-4dce-953d-a98467c5f769', {
        latitude,
        longitude,
      });
      console.log('Location sent to server:', response.data);
    } catch (error) {
      console.log('Error sending location to server:', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        sendLocationToServer();
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