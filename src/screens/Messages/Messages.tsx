import React, {useEffect, useState} from 'react';
import {View, Text, NativeModules, TouchableOpacity} from 'react-native';
import styles from './styles';
import {ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Message from '../../models/Message';
import SenderMessages from '../../models/SenderMessages';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigation';
type MessagesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MessageList'
>;

const {MMKVModule} = NativeModules;

const Messages: React.FC = () => {
  const navigation = useNavigation<MessagesScreenNavigationProp>();
  const [messages, setMessages] = useState<SenderMessages[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await MMKVModule.getFirstTenMessages();
        console.log('Fetched messages:', response);
        const fetchedMessages = JSON.parse(response);
        const senderMessagesArray = fetchedMessages
          .filter(
            (sender: {
              sender: string;
              messages: {isSyncedWithTelegram: boolean; text: string}[];
            }) =>
              sender.sender &&
              sender.sender.trim() !== '' &&
              sender.messages &&
              sender.messages.length > 0,
          )
          .map(
            (item: {
              messages: {isSyncedWithTelegram: boolean; text: string}[];
              sender: string;
            }) => {
              const transformedMessages = item.messages.map(
                (msg: {isSyncedWithTelegram: boolean; text: string}) =>
                  new Message(msg.isSyncedWithTelegram, msg.text),
              );
              return new SenderMessages(item.sender, transformedMessages);
            },
          );
        console.log('tranformed response:', senderMessagesArray);
        setMessages(senderMessagesArray);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handlePress = (senderMessage: SenderMessages) => {
    navigation.navigate('MessageList', {senderMessage: senderMessage});
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View>
        {messages.map((senderMessage, senderIndex) => (
          <TouchableOpacity
            key={senderIndex}
            onPress={() => handlePress(senderMessage)}>
            <View style={styles.senderContainer}>
              <Text style={styles.senderText}>{senderMessage.sender}</Text>
              <Text numberOfLines={1} style={styles.messageText}>
                {senderMessage.messages[0].text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

export default Messages;
