import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Vibration } from 'react-native';

let accelerometerSubscription = null;
let crashCallback = null;

export const startCrashDetection = async (onCrashDetected, threshold = 30, interval = 200) => {
  try {
    crashCallback = onCrashDetected;
    setUpdateIntervalForType(SensorTypes.accelerometer, interval);

    accelerometerSubscription = accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      console.log('Accelerometer magnitude:', magnitude);
      if (magnitude > threshold) {
        Vibration.vibrate(1000);
        crashCallback?.();
      }
    });
  } catch (error) {
    console.error('Crash detection error:', error);
  }
};

export const stopCrashDetection = () => {
  try {
    accelerometerSubscription?.unsubscribe();
    accelerometerSubscription = null;
  } catch (error) {
    console.error('Error stopping crash detection:', error);
  }
};