import React from 'react';
import { View, TextInput, StyleSheet, Text, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const INPUT_WIDTH = width * 0.65; // ~65% of screen width

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  isFocused,
  keyboardType = 'default',
  editable = true,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isFocused && styles.focusedInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        placeholderTextColor="#666"
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    width: INPUT_WIDTH,
    alignSelf: 'center',
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    color: '#003366',
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingVertical: Platform.OS === 'android' ? 10 : 12,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#003366',
  },
  focusedInput: {
    borderColor: '#007BFF',
  },
});