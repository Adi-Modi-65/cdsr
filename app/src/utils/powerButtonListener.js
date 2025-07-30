import { NativeEventEmitter, NativeModules } from 'react-native';
const { PowerButtonModule } = NativeModules;

export const listenForDoublePowerPress = (onDoublePress) => {
  const powerEventEmitter = new NativeEventEmitter(PowerButtonModule);
  return powerEventEmitter.addListener('PowerButtonDoublePress', onDoublePress);
};