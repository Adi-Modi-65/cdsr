import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { startDrivingModeService, stopDrivingModeService } from '../services/backgroundService';

const ToggleInputSection = () => {
  const [drivingMode, setDrivingMode] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  const handleCrashDetected = () => {
    console.log("Before alert",value)
    // Alert.alert('🚨 Crash Detected', 'No response? Emergency alert to your contacts.');
    console.log("After alert",value)
  };

  const toggleDrivingMode = async (value) => {
    debugger
    console.log("Driving Button clicked",value)
    setDrivingMode(value);
    try {
      if (value) {
        await startDrivingModeService(handleCrashDetected);
        console.log("start driving mode completed")
        Alert.alert('Driving Mode Enabled', 'Crash detection is active');
      } else {
        await stopDrivingModeService();
        Alert.alert('Driving Mode Disabled');
      }
    } catch (err) {
      console.error('Toggle error:', err);
      Alert.alert('Error', 'Could not toggle driving mode');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.toggleContainer}>
        <Text style={styles.label}>Driving Mode</Text>
        <Switch
          value={drivingMode}
          onValueChange={toggleDrivingMode}
          thumbColor={drivingMode ? '#fff' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#007BFF' }}
        />
      </View>

      {drivingMode && (
        <View style={styles.inputSection}>
          <TextInput
            placeholder="Enter Source"
            value={source}
            onChangeText={setSource}
            style={[styles.input, focusedInput === 'source' && styles.inputFocused]}
            onFocus={() => setFocusedInput('source')}
            onBlur={() => setFocusedInput('')}
            placeholderTextColor="#666"
          />
          <TextInput
            placeholder="Enter Destination"
            value={destination}
            onChangeText={setDestination}
            style={[styles.input, focusedInput === 'destination' && styles.inputFocused]}
            onFocus={() => setFocusedInput('destination')}
            onBlur={() => setFocusedInput('')}
            placeholderTextColor="#666"
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  inputSection: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  inputFocused: {
    borderColor: '#007BFF',
    shadowColor: '#007BFF',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ToggleInputSection;