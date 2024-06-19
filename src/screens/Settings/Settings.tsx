import React, {useState} from 'react';
import {View, ImageBackground, TextInput, Alert} from 'react-native';
import Button from '../../components/Button/Button';
import styles from './styles';
import {NativeModules} from 'react-native';

const {SharedPreferencesModule} = NativeModules;
interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const handleButtonPress = () => {
    SharedPreferencesModule.saveDetails(token, chatID, (success: boolean) => {
      if (success) {
        Alert.alert('Success', 'Token saved successfully!');
        setToken('');
        setChatID('');
      } else {
        Alert.alert('Error', 'Failed to save token.');
      }
    });
  };
  const [token, setToken] = useState<string>('');
  const [chatID, setChatID] = useState<string>('');

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Telegram Token"
          value={token}
          onChangeText={setToken}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Telegram Chat ID"
          value={chatID}
          onChangeText={setChatID}
        />
        <Button
          label="Save"
          onPress={() => handleButtonPress()}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

export default Settings;
