import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { Vibration } from 'react-native';

let subscription = null;

export const startCrashDetection = (onCrashDetected, threshold = 30, interval = 200) => {
  try {
    setUpdateIntervalForType(SensorTypes.accelerometer, interval);

    subscription = accelerometer.subscribe(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      console.log('Accel magnitude:', magnitude);
      if (magnitude >= threshold) {
        Vibration.vibrate(1000);
        onCrashDetected?.();
      }
    });
    console.log('Crash detection initiated');
  } catch (err) {
    console.error('CrashDetection start error:', err);
  }
};

export const stopCrashDetection = () => {
  try {
    subscription?.unsubscribe();
    subscription = null;
    console.log('Crash detection stopped');
  } catch (err) {
    console.error('Error stopping crash detection:', err);
  }
};