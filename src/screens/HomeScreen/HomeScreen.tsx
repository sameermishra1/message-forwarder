import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Text,
  View,
  Button as RNButton,
} from 'react-native';
import Button from '../../components/Button/Button';
import styles from './styles';
import strings from '../../localization/strings';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [isReadPermissionGranted, setIsReadPermissionGranted] = useState(false);

  const checkAndRequestReadSMSPermission = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
      );
      if (!hasPermission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: strings.readSmsPermission.title,
            message: strings.readSmsPermission.message,
            buttonNeutral: strings.readSmsPermission.buttonNeutral,
            buttonNegative: strings.readSmsPermission.buttonNegative,
            buttonPositive: strings.readSmsPermission.buttonPositive,
          },
        );
        setIsReadPermissionGranted(
          granted === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        setIsReadPermissionGranted(true);
      }
    }
  };

  useEffect(() => {
    checkAndRequestReadSMSPermission();
  }, []);

  const requestReadSMSPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: strings.readSmsPermission.title,
        message: strings.readSmsPermission.message,
        buttonNeutral: strings.readSmsPermission.buttonNeutral,
        buttonNegative: strings.readSmsPermission.buttonNegative,
        buttonPositive: strings.readSmsPermission.buttonPositive,
      },
    );
    setIsReadPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
  };

  const handleButtonPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {isReadPermissionGranted ? (
          <>
            <Button
              label={strings.buttonMessages}
              onPress={() => handleButtonPress('Messages')}
              style={styles.button}
            />
            <Button
              label={strings.buttonSettings}
              onPress={() => handleButtonPress('Settings')}
              style={styles.button}
            />
          </>
        ) : (
          <View>
            <Text>{strings.grantSmsPermissionMessage}</Text>
            <View style={styles.topMargin}>
              <RNButton
                title={strings.requestSmsPermission}
                onPress={requestReadSMSPermission}
              />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
