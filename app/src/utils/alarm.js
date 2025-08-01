import SoundPlayer from 'react-native-sound-player';

let alarmTimer = null;
let intensity = 0;
const beepLevels = ['beep1', 'beep2', 'beep3'];

export const startAlarm = (durationSec = 12) => {
  if (alarmTimer) return;

  intensity = 0;
  playNextBeep();

  alarmTimer = setInterval(() => {
    intensity = Math.min(intensity + 1, beepLevels.length - 1);
    playNextBeep();
  }, 2000); // beep every 2 sec, increasing urgency

  // Automatically stop alarm after duration
  setTimeout(() => {
    stopAlarm();
  }, durationSec * 1000);
};

function playNextBeep() {
  try {
    SoundPlayer.playSoundFile(beepLevels[intensity], 'mp3');
  } catch (e) {
    console.warn('Alarm play error:', e);
  }
}

export const stopAlarm = () => {
  if (alarmTimer) {
    clearInterval(alarmTimer);
    alarmTimer = null;
    SoundPlayer.stop();
    intensity = 0;
  }
};

export const isAlarmRunning = () => alarmTimer !== null;