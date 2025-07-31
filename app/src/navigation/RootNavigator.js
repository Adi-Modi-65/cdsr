import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountSetup from '../screens/AccountSetup';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { getUser, initUserTable } from '../utils/db';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setupDB = async () => {
      await initUserTable();
      const user = await getUser();
      setUserExists(!!user);
      setLoading(false);
    };
    setupDB();
  }, []);

  if (loading) return null;

  return userExists ? (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingBottom: 5, height: 60 },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  ) : (
    <AccountSetup />
  );
};

export default RootNavigator;