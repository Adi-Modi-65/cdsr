import { VolumeManager } from 'react-native-volume-manager';
import { stopAlarm, isAlarmRunning } from './alarm';

let lastPress = 0;
let pressCount = 0;
let lastVolume = null;
let volumeListener = null;

export const registerNeutraliser = () => {
  return new Promise(resolve => {
    if (volumeListener) {
      resolve(false);
      return;
    }

    VolumeManager.getVolume().then(vol => {
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

          unregisterNeutraliser();
          resolve(true); // user neutralised
        }
      }

      lastVolume = volume;
    });

    setTimeout(() => {
      if (volumeListener) {
        unregisterNeutraliser();
        resolve(false); // user did not neutralise
      }
    }, 15000);
  });
};

export const unregisterNeutraliser = () => {
  volumeListener?.remove();
  volumeListener = null;
  pressCount = 0;
  lastPress = 0;
  lastVolume = null;
};
