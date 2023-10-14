import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';
import {useAuth} from './contexts/Auth';

export const Root = () => {
  const {isLoggedIn} = useAuth();

  return (
      <NavigationContainer>
        { isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
};