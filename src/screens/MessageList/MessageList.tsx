import React from 'react'; // Add this line to import React
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
import SenderMessages from '../../models/SenderMessages';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

const MessageList = () => {
  const route = useRoute();
  const {senderMessage} = route.params as {senderMessage: SenderMessages};

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalSenderText}>{senderMessage.sender}</Text>
      <ScrollView>
        {senderMessage.messages.map((message, messageIndex) => (
          <View key={messageIndex} style={styles.modalMessageContainer}>
            <Icon
              name={
                message.isSyncedWithTelegram ? 'check-circle' : 'times-circle'
              }
              size={20}
              color={message.isSyncedWithTelegram ? 'green' : 'red'}
              style={styles.syncIcon}
            />
            <Text style={styles.modalMessageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MessageList;
