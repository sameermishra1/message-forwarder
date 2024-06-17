import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {NativeModules} from 'react-native';

const {SharedPreferencesModule} = NativeModules;

const SettingsScreen: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [chatID, setChatID] = useState<string>('');

  const saveDetails = () => {
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

  return (
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
      <Button title="Save Details" onPress={saveDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default SettingsScreen;
