import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

import {messageListStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import Message from '../../models/Message';
import SenderMessages from '../../models/SenderMessages';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigation';
import crashlytics from '@react-native-firebase/crashlytics';
import {NativeModules} from 'react-native';

type MessagesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MessageList'
>;

const {MMKVModule} = NativeModules;

const Messages: React.FC = () => {
  const navigation = useNavigation<MessagesScreenNavigationProp>();
  const [messages, setMessages] = useState<SenderMessages[]>([]);
  const theme = useTheme();

  const renderItem = ({item}: {item: SenderMessages}) => (
    <TouchableOpacity
      style={messageListStyles.messageRow}
      onPress={() => navigation.navigate('Message', {senderMessage: item})}>
      <Text style={messageListStyles.senderName}>{item.sender}</Text>
      <Text
        style={messageListStyles.messageText}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.messages[0].text}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await MMKVModule.getFirstTenMessages();
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
        setMessages(senderMessagesArray);
      } catch (error) {
        console.error('Something went wrong. Try again later!');
        crashlytics().recordError(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <View
      style={[
        messageListStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={messageListStyles.list}
        contentContainerStyle={messageListStyles.listContent}
      />
    </View>
  );
};

export default Messages;
