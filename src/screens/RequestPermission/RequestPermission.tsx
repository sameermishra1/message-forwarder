import React from 'react';
import {View, Text, Button, PermissionsAndroid, Platform} from 'react-native';
import styles from './styles';

const RequestPermission = () => {
  const requestSMSPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'SMS Permission',
            message: 'This app needs access to your SMS for processing.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can read SMS');
          // Permission granted: proceed with your SMS reading logic
        } else {
          console.log('SMS permission denied');
          // Permission denied: handle accordingly
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Request SMS Permission</Text>
      <Button title="Request Permission" onPress={requestSMSPermission} />
    </View>
  );
};

export default RequestPermission;
