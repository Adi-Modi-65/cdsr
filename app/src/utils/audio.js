import Sound from 'react-native-sound';

let beep;

export const playBeep = () => {
  beep = new Sound('beep_warning.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (!error) {
      beep.setNumberOfLoops(-1); // loop until stopped
      beep.play();
    } else {
      console.log("Beep error:", error);
    }
  });
};

export const stopBeep = () => {
  if (beep) {
    beep.stop(() => beep.release());
  }
};