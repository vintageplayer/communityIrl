import React from 'react';
import {Button, View} from 'react-native';
import {styles} from './styles';

export const LoginScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("Location")} />
    </View>
  );
};