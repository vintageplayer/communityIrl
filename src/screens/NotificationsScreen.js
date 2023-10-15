import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useAuth} from '../contexts/Auth';

export const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text  style={styles.text} >
        No Notifications to show.
      </Text>
    </View>
  );
};