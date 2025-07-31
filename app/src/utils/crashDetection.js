import { useEffect, useRef } from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { Alert } from 'react-native';

export const useCrashDetection = (enabled = false) => {
  const accelSub = useRef(null);
  const gyroSub = useRef(null);

  useEffect(() => {
    debugger
    if (!enabled) {
      if (accelSub.current) accelSub.current.unsubscribe();
      if (gyroSub.current) gyroSub.current.unsubscribe();
      console.log('[CrashDetection] Sensors stopped');
      return;
    }

    console.log('[CrashDetection] Sensors started');

    // Set update intervals
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    setUpdateIntervalForType(SensorTypes.gyroscope, 200);

    // Accelerometer subscription
    accelSub.current = accelerometer.subscribe(({ x, y, z }) => {
      const total = Math.sqrt(x * x + y * y + z * z);

      if (total > 20) {
        console.log('[CrashDetection] Accelerometer: Possible crash detected');
      }

      if (total > 30) {
        Alert.alert('Crash Detected!', `G-Force: ${total.toFixed(2)}`);
      }
    });

    // Gyroscope subscription
    gyroSub.current = gyroscope.subscribe(({ x, y, z }) => {
      const total = Math.sqrt(x * x + y * y + z * z);

      if (total > 20) {
        console.log('[CrashDetection] Gyroscope: Possible crash detected');
      }
    });

    // Cleanup when component unmounts or toggle changes
    return () => {
      if (accelSub.current) accelSub.current.unsubscribe();
      if (gyroSub.current) gyroSub.current.unsubscribe();
      console.log('[CrashDetection] Sensors cleaned up');
    };
  }, [enabled]); // Trigger effect when `enabled` changes
};