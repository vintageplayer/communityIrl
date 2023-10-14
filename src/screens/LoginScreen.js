import React from 'react';
import {Button, View} from 'react-native';
import {styles} from './styles';
import {useAuth} from '../contexts/Auth';

export const LoginScreen = ({navigation}) => {
  const {login} = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => login()} />
    </View>
  );
};