import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LocationScreen } from '../screens/LocationScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
  );
};