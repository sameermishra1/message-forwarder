import React from 'react'; // Add this line to import React
import {View, FlatList, TouchableOpacity} from 'react-native';
import SenderMessages from '../../models/SenderMessages';
import {useRoute} from '@react-navigation/native';
import {useTheme, Text} from 'react-native-paper';
import {messageListStyles} from '../Messages/styles';
import Message from '../../models/Message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const SyncedIcon = () => (
  <MaterialCommunityIcons
    name="check-circle"
    style={styles.icon}
    color={'green'}
  />
);
const FailedIcon = () => (
  <MaterialCommunityIcons
    name="close-circle"
    style={styles.icon}
    color={'red'}
  />
);

const MessageList = () => {
  const route = useRoute();
  const {senderMessage} = route.params as {senderMessage: SenderMessages};
  const theme = useTheme();
  const renderItem = ({item}: {item: Message}) => (
    <TouchableOpacity style={messageListStyles.messageRow}>
      <View style={styles.iconAndTextContainer}>
        {item.isSyncedWithTelegram ? (
          <>
            <SyncedIcon />
          </>
        ) : (
          <FailedIcon />
        )}
        <Text style={messageListStyles.messageText} ellipsizeMode="tail">
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View
      style={[
        messageListStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <Text
        style={[messageListStyles.title, {color: theme.colors.onBackground}]}>
        {senderMessage.sender}
      </Text>
      <FlatList
        data={senderMessage.messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={messageListStyles.list}
        contentContainerStyle={messageListStyles.listContent}
      />
    </View>
  );
};

export default MessageList;
