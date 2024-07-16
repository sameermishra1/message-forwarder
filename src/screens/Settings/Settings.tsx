import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Snackbar, useTheme} from 'react-native-paper';
import styles from './styles';
import {NativeModules} from 'react-native';

const {SharedPreferencesModule} = NativeModules;
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [token, setToken] = useState<string>('');
  const [chatID, setChatID] = useState<string>('');
  const theme = useTheme();

  const handleButtonPress = () => {
    SharedPreferencesModule.saveDetails(token, chatID, (success: boolean) => {
      if (success) {
        setToken('');
        setChatID('');
        setSnackbarMessage('Data saved successfully!');
      } else {
        setSnackbarMessage('Failed to save data. Please try again.');
      }
      setSnackbarVisible(true);
    });
  };

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <TextInput
        placeholder="Enter Telegram Token"
        value={token}
        onChangeText={setToken}
        style={styles.input}
        theme={{fonts: {regular: {fontFamily: 'System'}}}}
      />
      <TextInput
        placeholder="Enter Telegram Chat ID"
        value={chatID}
        onChangeText={setChatID}
        style={styles.input}
        theme={{fonts: {regular: {fontFamily: 'System'}}}}
      />
      <Button
        mode="contained"
        onPress={() => handleButtonPress()}
        style={styles.button}
        disabled={!token || !chatID}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}>
        Save
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default Settings;
