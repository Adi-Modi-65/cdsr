import BackgroundService from 'react-native-background-actions';
import {
  startCrashDetection,
  stopCrashDetection,
} from '../utils/crashDetection';

let taskRunning = false;

const backgroundTask = async (taskData) => {
  const { threshold = 30, interval = 200 } = taskData;
  taskRunning = true;

  await startCrashDetection(() => {
    console.log('Crash callback triggered from background!');
    taskRunning = false; // Stop loop
    BackgroundService.stop();
  }, threshold, interval);

  await new Promise(async (resolve) => {
    while (taskRunning) {
      await new Promise(res => setTimeout(res, 1000));
    }
    resolve();
  });
};

export const startDrivingModeService = async () => {
  try {
    await BackgroundService.start(backgroundTask, {
      taskName: 'DrivingMode',
      taskTitle: 'Driving Mode Active',
      taskDesc: 'Monitoring for crashes...',
      taskIcon: { name: 'ic_launcher', type: 'mipmap' },
      color: '#007BFF',
      parameters: { threshold: 30, interval: 200 },
      linkingURI: 'safenav://',
    });
  } catch (error) {
    console.error('Error starting background service:', error);
  }
};

export const stopDrivingModeService = async () => {
  try {
    taskRunning = false;
    stopCrashDetection();
    await BackgroundService.stop();
  } catch (error) {
    console.error('Error stopping background service:', error);
  }
};