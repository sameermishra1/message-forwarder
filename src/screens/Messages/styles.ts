import {StyleSheet} from 'react-native';

export const messageListStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'flex-end', // This will align the content to the bottom
  },
  messageRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  icon: {
    fontSize: 24,
  },
});
