import { VolumeManager } from 'react-native-volume-manager';
import { stopAlarm, isAlarmRunning } from './alarm';

let lastPress = 0;
let pressCount = 0;
let lastVolume = null;
let volumeListener = null;

export const registerNeutraliser = () => {
  if (volumeListener) return;

  VolumeManager.getVolume().then((vol) => {
    lastVolume = vol.volume;
  });

  volumeListener = VolumeManager.addVolumeListener(({ volume }) => {
    if (!isAlarmRunning()) return;

    if (volume < lastVolume) {
      const now = Date.now();
      const timeDiff = now - lastPress;

      if (timeDiff < 1200) {
        pressCount++;
      } else {
        pressCount = 1;
      }

      lastPress = now;

      if (pressCount === 2) {
        stopAlarm();
        console.log('Neutralised alarm via double volume-down.');
        pressCount = 0;
      }
    }

    lastVolume = volume;
  });
};

export const unregisterNeutraliser = () => {
  volumeListener?.remove();
  volumeListener = null;
  pressCount = 0;
  lastPress = 0;
  lastVolume = null;
};