import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LocationScreen } from '../screens/LocationScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { BottomTabIcon } from '../components/BottomTabIcon'

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({focused}) => (
      <BottomTabIcon focused={focused} title={route.name} />
    ),
  });
  return (
      <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ tabBarBadge: 0 }} />
      </Tab.Navigator>
  );
};