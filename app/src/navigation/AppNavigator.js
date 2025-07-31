import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AccountSetup from '../screens/AccountSetup';
import CrashAlertScreen from '../screens/CrashAlertScreen';
import RootNavigator from './RootNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AccountSetup" component={AccountSetup} />
      <Stack.Screen name="Home" component={RootNavigator} />
      <Stack.Screen name="CrashAlert" component={CrashAlertScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;