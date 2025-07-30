import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Vibration } from 'react-native';
import { playBeep, stopBeep } from '../utils/audio';
import { listenForDoublePowerPress } from '../utils/powerButtonListener';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const CrashAlertScreen = () => {
  const [timer, setTimer] = useState(10);
  const navigation = useNavigation();

  useEffect(() => {
    playBeep();
    Vibration.vibrate([500, 1000], true);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleNoResponse();
        }
        return prev - 1;
      });
    }, 1000);

    const subscription = listenForDoublePowerPress(() => {
      clearInterval(interval);
      stopBeep();
      Vibration.cancel();
      navigation.goBack(); // dismiss alert screen
    });

    return () => {
      stopBeep();
      Vibration.cancel();
      clearInterval(interval);
      subscription?.remove?.();
    };
  }, []);

  const handleNoResponse = () => {
    // TODO: Send SMS / Call emergency contact here
    console.warn("No user response. Sending alert...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crash Detected</Text>
      <Text style={styles.timer}>Respond in: {timer}s</Text>
      <Text style={styles.info}>Double press power button if you are okay.</Text>
    </View>
  );
};

export default CrashAlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 48,
    color: '#fff',
    marginVertical: 20,
  },
  info: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});