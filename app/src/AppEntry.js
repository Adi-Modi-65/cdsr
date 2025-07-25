import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { openSettings } from 'react-native-permissions';
import { requestAllPermissions } from './utils/permissions';

export default function AppEntry() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePermissions = async () => {
    setLoading(true);
    const result = await requestAllPermissions();

    if (result.allGranted) {
      setPermissionsGranted(true);
      setLoading(false);
      return;
    }

    if (result.deniedPermissions.length > 0) {
      Alert.alert(
        "Permissions Required",
        "Some permissions were denied. Please allow them to proceed.",
        [
          { text: "Retry", onPress: () => handlePermissions() },
          { text: "Cancel", style: "cancel", onPress: () => setLoading(false) }
        ]
      );
    }

    if (result.permanentlyDeniedPermissions.length > 0) {
      Alert.alert(
        "Permissions Blocked",
        "Some permissions are permanently denied. Please enable them from settings.",
        [
          { text: "Open Settings", onPress: () => openSettings() },
          { text: "Cancel", style: "cancel", onPress: () => setLoading(false) }
        ]
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    handlePermissions();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : permissionsGranted ? (
        <Text style={styles.text}>All permissions granted. App is ready!</Text>
      ) : (
        <View style={styles.retryContainer}>
          <Text style={styles.text}>Permissions are still required.</Text>
          <Button title="Grant Permissions" onPress={handlePermissions} />
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const isSmallDevice = width < 360;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  retryContainer: {
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: isSmallDevice ? 16 : 18,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 16,
    color: '#333',
  },
});
