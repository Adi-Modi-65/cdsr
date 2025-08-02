import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { SmsModule } = NativeModules;

export const sendEmergencySms = async (contacts = ['+918955160998'], message = 'Emergency, Crash Alert') => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'SMS Permission',
        message: 'SafeNAV needs permission to send emergency SMS messages.',
        buttonPositive: 'OK',
      }
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('SMS permission denied');
      return;
    }
  }

  try {
    if (contacts.length === 1) {
      await SmsModule.sendSms(contacts[0], message);
    } else if (contacts.length > 1) {
      await SmsModule.sendBulkSms(contacts, message);
    }
    console.log('Emergency SMS sent successfully.');
  } catch (err) {
    console.error('Failed to send SMS:', err);
  }
};