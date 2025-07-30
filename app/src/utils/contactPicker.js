import { PermissionsAndroid, Platform } from 'react-native';
import { selectContactPhone } from 'react-native-select-contact';

export const pickContact = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'App needs access to your contacts',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Contacts permission denied');
      }
    }
    const selection = await selectContactPhone();
    if (!selection) {
      // user cancelled
      return null;
    }
    const { contact, selectedPhone } = selection;
    return { name: contact.name, number: selectedPhone.number };
  } catch (err) {
    console.error('Contact Picker Error:', err);
    return null;
  }
};