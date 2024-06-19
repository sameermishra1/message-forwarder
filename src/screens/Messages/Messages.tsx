import React, {useState} from 'react';
import {View, Text, NativeModules} from 'react-native';
import styles from './styles';
import {ImageBackground} from 'react-native';
import Button from '../../components/Button/Button';

const {SmsModule} = NativeModules;

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Map<string, string>>(new Map());
  const handleButtonPress = async () => {
    try {
      const smsMessages = await SmsModule.readSmsMessages();
      setMessages(new Map(Object.entries(smsMessages)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View>
          {Array.from(messages.entries()).map(([key, value]) => (
            <View key={key}>
              <Text style={styles.key}> {key}</Text>
              <Text style={styles.key}>{value}</Text>
            </View>
          ))}
        </View>

        <Button
          label="Retrieve"
          onPress={() => handleButtonPress()}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

export default Messages;
