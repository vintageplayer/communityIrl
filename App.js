import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const previousLocation = useRef(null);

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

  const sendLocationToServer = async (location) => {
    try {
      const response = await axios.post('https://webhook.site/90efd798-cb95-4dce-953d-a98467c5f769', {
        location
      });
      console.log('Location sent to server:', location);
    } catch (error) {
      console.log('Error sending location to server:', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const newLatitude = position.coords.latitude;
        const newLongitude = position.coords.longitude;

        if (newLatitude !== latitude || newLongitude !== longitude) {
          setLatitude(newLatitude);
          setLongitude(newLongitude);

          if (
            !previousLocation.current ||
            (previousLocation.current.latitude !== newLatitude ||
              previousLocation.current.longitude !== newLongitude)
          ) {
            sendLocationToServer({
              'latitude': newLatitude,
              'longitude': newLongitude
            });
          }

          previousLocation.current = {
            latitude: newLatitude,
            longitude: newLongitude,
          };
        }
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={styles.text}>
          Latitude: {latitude}{'\n'}
          Longitude: {longitude}
        </Text>
      </View>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default App;