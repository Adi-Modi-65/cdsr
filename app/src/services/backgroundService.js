import BackgroundService from 'react-native-background-actions';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const backgroundTask = async (taskDataArguments) => {
  const { interval } = taskDataArguments;
  await new Promise(async (resolve) => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log('Running Driving Mode...', i);
      await new Promise(r => setTimeout(r, interval || 1000));
    }
    resolve();
  });
};

export const startDrivingModeService = async (onCrash) => {
  console.log('start of driving mode');
  globalOnCrashCallback = onCrash;

  if (!onCrash || typeof onCrash !== 'function') {
    console.warn('startDrivingModeService requires a callback');
    return;
  }

  try {
    // Ensure permission
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.FOREGROUND_SERVICE);
      console.log("hi")
      if (result !== RESULTS.GRANTED) {
        console.log('Foreground service permission not granted.');
        return;
      }
    }

    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
    }

    await BackgroundService.start(backgroundTask, {
      taskName: 'DrivingMode',
      taskTitle: 'Driving Mode Active',
      taskDesc: 'Monitoring for crashes…',
      taskIcon: { name: 'ic_launcher', type: 'mipmap' }, // Optional, can remove if unstable
      color: '#007BFF',
      parameters: { interval: 1000 },
    });

    console.log('Service started successfully');
  } catch (error) {
    console.error('Error starting DrivingMode:', error);
  }
};


export const stopDrivingModeService = async () => {
  taskRunning = false;
  await BackgroundService.stop();
};
