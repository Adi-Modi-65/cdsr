import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  startDrivingModeService,
  stopDrivingModeService,
} from '../services/backgroundService';

const ToggleInputSection = () => {
  const [drivingMode, setDrivingMode] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  const toggleDrivingMode = async (value) => {
    setDrivingMode(value);
    try {
      if (value) {
        await startDrivingModeService();
        Alert.alert('Driving Mode Enabled', 'Crash detection is active.');
      } else {
        await stopDrivingModeService();
        Alert.alert('Driving Mode Disabled', 'Crash detection stopped.');
      }
    } catch (error) {
      console.error('Driving Mode Error:', error);
      Alert.alert('Error', 'Failed to toggle Driving Mode.');
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

export default ToggleInputSection;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#e1f5fe',
    borderRadius: 14,
  },
  label: {
    fontSize: 18,
    color: '#003366',
    fontWeight: '500',
  },
  inputSection: {
    gap: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  inputFocused: {
    borderColor: '#007BFF',
  },
});