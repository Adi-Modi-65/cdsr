import { useEffect, useRef, useState } from 'react';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { Platform, PermissionsAndroid } from 'react-native';
import { startAlarm } from './alarm';
import { registerNeutraliser } from './neutraliseAlarm';
import { sendEmergencySms } from './smsAlert';

const isCrash = (accelTotal, gyroTotal) => {
  return accelTotal > 30 || gyroTotal > 20;
};

/**
 * Calls onCrashDetected() --> crash (only once per toggle).
 * @param {boolean} enabled - Whether crash detection should be active.
 * @param {Function} onCrashDetected - Callback to run when crash is detected.
 */

export const useCrashDetection = (
  enabled = false,
  onCrashDetected = async () => {
    console.log('Crash detected! Triggering alarm...');
    startAlarm();
    const neutralised = await registerNeutraliser();
    if (!neutralised) {
      sendEmergencySms();
    } else {
      console.log('Alarm neutralised by User, SMS not sent.');
    }
  },
) => {
  const accelSub = useRef(null);
  const gyroSub = useRef(null);
  const crashTriggered = useRef(false); // to prevent duplicate triggers

  const accelData = useRef(0);
  const gyroData = useRef(0);

  // Android runtime permission (only for Android)
  const requestSensorPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
      ]);
    }
  };

  useEffect(() => {
    crashTriggered.current = false;

    if (!enabled) {
      accelSub.current?.unsubscribe();
      gyroSub.current?.unsubscribe();
      console.log('Sensors stopped');
      return;
    }

    console.log('Sensors started');
    requestSensorPermissions();

    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    setUpdateIntervalForType(SensorTypes.gyroscope, 200);

    accelSub.current = accelerometer.subscribe(({ x, y, z }) => {
      const totalAccel = Math.hypot(x, y, z);
      accelData.current = totalAccel;

      checkForCrash(); // check on every update
    });

    gyroSub.current = gyroscope.subscribe(({ x, y, z }) => {
      const totalGyro = Math.hypot(x, y, z);
      gyroData.current = totalGyro;

      checkForCrash(); // check on every update
    });

    const checkForCrash = () => {
      if (crashTriggered.current) return;
      const crash = isCrash(accelData.current, gyroData.current);
      console.log('Crash Detected', crash);

      if (crash) {
        crashTriggered.current = true;
        onCrashDetected();
      }
    };

    // Clean up when driving mode turns off
    return () => {
      accelSub.current?.unsubscribe();
      gyroSub.current?.unsubscribe();
      console.log('Sensors cleaned up');
    };
  }, [enabled]);
};
