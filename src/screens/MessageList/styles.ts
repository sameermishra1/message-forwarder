import {StyleSheet} from 'react-native';
import ScreenStyles from '../../styles/ScreenStyles';

const styles = StyleSheet.create({
  ...ScreenStyles,
  key: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  senderContainer: {
    marginBottom: 20,
    marginLeft: 10,
  },
  senderText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  messageText: {
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalSenderText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalMessageText: {
    marginVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncIcon: {
    marginRight: 10,
  },
  modalMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default styles;
