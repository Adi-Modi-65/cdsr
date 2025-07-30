import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import { requestAllPermissions } from '../utils/permissions';
import { initUserTable, getUser } from '../utils/db';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const startup = async () => {
      try {
        // 1. Request permissions
        const result = await requestAllPermissions();

        if (!result.allGranted) {
          if (result.permanentlyDeniedPermissions.length > 0) {
            Alert.alert(
              'Permissions Blocked',
              'Some permissions are permanently denied. Please enable them from settings.',
              [
                { text: 'Open Settings', onPress: openSettings },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
            return;
          }

          if (result.deniedPermissions.length > 0) {
            Alert.alert(
              'Permissions Required',
              'Please grant all required permissions to continue.',
              [
                { text: 'Retry', onPress: () => retryPermissions() },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
            return;
          }
        }

        // 2. Init user table
        await initUserTable();

        // 3. Check if user exists
        const user = await getUser();

        navigation.reset({
          index: 0,
          routes: [{ name: user ? 'Home' : 'Welcome' }],
        });
      } catch (error) {
        console.error('Splash startup error:', error);
        Alert.alert('Error', 'Something went wrong during app startup. Please restart the app.');
      } finally {
        setLoading(false);
      }
    };

    startup();
  }, [retrying]);

  const retryPermissions = () => {
    setRetrying((prev) => !prev); // Toggle state to re-trigger useEffect
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeNAV</Text>
      <Text style={styles.subtitle}>Ensuring Safer Roads...</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <TouchableOpacity onPress={retryPermissions} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#053B50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: width * 0.05,
    color: '#DFF6FF',
    marginBottom: height * 0.05,
    textAlign: 'center',
  },
  loader: {
    marginTop: height * 0.02,
  },
  retryButton: {
    backgroundColor: '#176B87',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.15,
    borderRadius: 30,
    marginTop: 20,
  },
  retryText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});