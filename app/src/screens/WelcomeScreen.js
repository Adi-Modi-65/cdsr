import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 360;

const WelcomeScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('AccountSetup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to SafeNAV</Text>

      <View style={styles.loaderWrapper}>
        <LottieView
          source={require('../assets/loader.json')}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 60,
  },
  heading: {
    fontSize: isSmallDevice ? 22 : 28,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 24,
    textAlign: 'center',
  },
  loaderWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loader: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
    elevation: Platform.OS === 'android' ? 3 : 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '500',
  },
});
