import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import {styles, homeScreenStyles} from './styles';
import strings from '../../localization/strings';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Switch, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesIcon = () => (
  <MaterialCommunityIcons name="message" style={homeScreenStyles.icon} />
);

const SettingsIcon = () => (
  <MaterialCommunityIcons
    name="account-settings"
    style={homeScreenStyles.icon}
  />
);

const {SmsModule} = NativeModules;

type RootStackParamList = {
  Home: undefined;
  Messages: {screenName: string};
  Settings: {screenName: string};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function HomeScreen({
  navigation,
  isDarkMode,
  setIsDarkMode,
}: HomeScreenProps) {
  const theme = useTheme();
  const [isReadPermissionGranted, setIsReadPermissionGranted] = useState(false);
  const [crashlyticsConsent, setCrashlyticsConsent] = useState(false);

  const fetchConsent = async () => {
    const value = await AsyncStorage.getItem('userConsent');
    var consent = false;
    if (value !== null) {
      const booleanValue = JSON.parse(value);
      if (booleanValue) {
        consent = true;
      }
    }
    setCrashlyticsConsent(consent);
  };

  useEffect(() => {
    fetchConsent();
  }, []);

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

  const toggleCrashlyticsConsent = async () => {
    const consent = !crashlyticsConsent;
    setCrashlyticsConsent(consent);
    await AsyncStorage.setItem('userConsent', consent.toString());
    await crashlytics().setCrashlyticsCollectionEnabled(crashlyticsConsent);
    if (consent) {
      await SmsModule.giveConsentForCrashlytics();
    } else {
      await SmsModule.revokeConsentForCrashlytics();
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
    if (
      granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      granted === PermissionsAndroid.RESULTS.DENIED
    ) {
      Alert.alert(
        strings.readSmsPermission.permissionDeniedMessage,
        strings.readSmsPermission.message +
          strings.readSmsPermission.permanentlyDeniedMessage,
        [
          {text: strings.readSmsPermission.buttonNegative, style: 'cancel'},
          {
            text: strings.readSmsPermission.openSettings,
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
    setIsReadPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
  };
  return (
    <View
      style={[
        homeScreenStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <Text
        style={[homeScreenStyles.title, {color: theme.colors.onBackground}]}>
        {strings.welcome}
      </Text>
      <View style={homeScreenStyles.topContainer}>
        <View style={homeScreenStyles.consentContainer}>
          <Text
            style={[
              homeScreenStyles.consentText,
              {color: theme.colors.onBackground},
            ]}>
            {strings.analyticsConsent}
          </Text>
          <Switch
            value={crashlyticsConsent}
            onValueChange={toggleCrashlyticsConsent}
          />
        </View>
        <View style={homeScreenStyles.darkModeContainer}>
          <Text
            style={[
              homeScreenStyles.darkModeText,
              {color: theme.colors.onBackground},
            ]}>
            {strings.darkMode}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
          />
        </View>
      </View>
      {isReadPermissionGranted ? (
        <>
          <View style={homeScreenStyles.buttonContainer}>
            <Button
              onPress={() =>
                navigation.navigate('Messages', {
                  screenName: strings.buttonMessages,
                })
              }
              mode="contained"
              icon={MessagesIcon}
              style={homeScreenStyles.button}
              contentStyle={homeScreenStyles.buttonContent}
              labelStyle={homeScreenStyles.buttonLabel}>
              {strings.buttonMessages}
            </Button>
            <Button
              mode="contained"
              icon={SettingsIcon}
              onPress={() =>
                navigation.navigate('Settings', {
                  screenName: strings.buttonSettings,
                })
              }
              style={homeScreenStyles.button}
              contentStyle={homeScreenStyles.buttonContent}
              labelStyle={homeScreenStyles.buttonLabel}>
              {strings.buttonSettings}
            </Button>
          </View>
        </>
      ) : (
        <View style={homeScreenStyles.buttonContainer}>
          <Text
            style={[
              homeScreenStyles.permissionTitle,
              {color: theme.colors.onBackground},
            ]}>
            {strings.grantSmsPermissionMessage}
          </Text>
          <Text
            style={[
              homeScreenStyles.permissionContent,
              {color: theme.colors.onBackground},
            ]}>
            {strings.readSmsPermission.message}
          </Text>
          <View style={styles.topMargin}>
            <Button
              mode="contained"
              icon={SettingsIcon}
              onPress={requestReadSMSPermission}
              style={homeScreenStyles.button}
              contentStyle={homeScreenStyles.buttonContent}
              labelStyle={homeScreenStyles.buttonLabel}>
              {strings.requestSmsPermission}
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
