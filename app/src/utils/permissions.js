import { PermissionsAndroid, Platform } from 'react-native';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ANDROID_PERMISSIONS = [
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  PermissionsAndroid.PERMISSIONS.CALL_PHONE,
  PermissionsAndroid.PERMISSIONS.BODY_SENSORS,
];

const IOS_PERMISSIONS = [
  PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PERMISSIONS.IOS.CONTACTS,
  PERMISSIONS.IOS.MOTION,
];

// Unified permission checker
export const requestAllPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const statuses = await PermissionsAndroid.requestMultiple(ANDROID_PERMISSIONS);

      const deniedPermissions = [];
      const permanentlyDeniedPermissions = [];

      for (const [permission, status] of Object.entries(statuses)) {
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          deniedPermissions.push(permission);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          permanentlyDeniedPermissions.push(permission);
        }
      }

      return {
        allGranted: deniedPermissions.length === 0 && permanentlyDeniedPermissions.length === 0,
        deniedPermissions,
        permanentlyDeniedPermissions,
      };
    } catch (error) {
      console.warn('Permission error:', error);
      return {
        allGranted: false,
        deniedPermissions: [],
        permanentlyDeniedPermissions: [],
      };
    }
  } else {
    const results = await requestMultiple(IOS_PERMISSIONS);

    const deniedPermissions = [];
    const permanentlyDeniedPermissions = [];

    for (const [permission, status] of Object.entries(results)) {
      if (status === RESULTS.DENIED) {
        deniedPermissions.push(permission);
      } else if (status === RESULTS.BLOCKED) {
        permanentlyDeniedPermissions.push(permission);
      }
    }

    return {
      allGranted: deniedPermissions.length === 0 && permanentlyDeniedPermissions.length === 0,
      deniedPermissions,
      permanentlyDeniedPermissions,
    };
  }
};
