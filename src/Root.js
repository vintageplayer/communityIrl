import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';
import { useAuth } from './contexts/Auth';
import { Loading } from './components/Loading';

export const Root = () => {
  const {isLoggedIn, loading} = useAuth();

  if (loading) {
    return <Loading />
  }

  return (
      <NavigationContainer>
        { isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
  );
};