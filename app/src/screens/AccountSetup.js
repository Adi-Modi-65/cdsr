import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputField from '../components/InputField';
import { pickContact } from '../utils/contactPicker';
import { insertUser } from '../utils/db';

const AccountSetup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    contact1: '',
    contact2: '',
  });

  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhoneNumber = phone => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  };

  const handlePickContact = async key => {
    try {
      setLoading(true);
      const contact = await pickContact();
      if (contact) {
        handleChange(key, `${contact.name} (${contact.number})`);
      } else {
        Alert.alert('No contact selected or permission denied');
      }
    } catch (error) {
      Alert.alert('Error picking contact', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { name, phone, contact1, contact2 } = formData;

    if (!name || !phone || !contact1 || !contact2) {
      Alert.alert('All fields are required!');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      Alert.alert('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      await insertUser({ name, phone, contact1, contact2 });
      Alert.alert('Account Setup Complete!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      Alert.alert('Error saving user data', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Account Setup</Text>

        <InputField
          label="Full Name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
          placeholder="Enter your name"
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'name'}
        />

        <InputField
          label="Phone Number"
          value={formData.phone}
          onChangeText={text => handleChange('phone', text)}
          placeholder="Enter your phone number"
          onFocus={() => setFocusedInput('phone')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'phone'}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          onPress={() => handlePickContact('contact1')}
          activeOpacity={0.7}
        >
          <InputField
            label="Family Contact 1"
            value={formData.contact1}
            placeholder="Pick a contact"
            editable={false}
            onFocus={() => setFocusedInput('contact1')}
            onBlur={() => setFocusedInput(null)}
            isFocused={focusedInput === 'contact1'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handlePickContact('contact2')}
          activeOpacity={0.7}
        >
          <InputField
            label="Family Contact 2"
            value={formData.contact2}
            placeholder="Pick a contact"
            editable={false}
            onFocus={() => setFocusedInput('contact2')}
            onBlur={() => setFocusedInput(null)}
            isFocused={focusedInput === 'contact2'}
          />
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#007BFF"
            style={{ marginVertical: 20 }}
          />
        )}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AccountSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    marginTop: 20,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
