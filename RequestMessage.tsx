import React, {useState} from 'react';
import {NativeModules, Button, View, Text, StyleSheet} from 'react-native';

const {SmsModule} = NativeModules;

const RequestMessage = () => {
  const [messages, setMessages] = useState<Map<string, string[]>>(new Map());

  const onPress = async () => {
    try {
      const smsMessages = await SmsModule.readSmsMessages();
      Object.entries(smsMessages).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      setMessages(new Map(Object.entries(smsMessages)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Button
        title="Click to invoke native module!"
        color="#841584"
        onPress={onPress}
      />
      <View>
        {Array.from(messages.entries()).map(([key, value]) => (
          <View key={key}>
            <Text style={styles.key}> {key}</Text>
            {value.map(item => (
              <Text key={item}>{item}</Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  key: {
    fontWeight: 'bold',
  },
});

export default RequestMessage;
