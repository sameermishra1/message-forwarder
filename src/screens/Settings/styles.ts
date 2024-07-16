import {StyleSheet} from 'react-native';
import {ScreenStyles} from '../../styles/ScreenStyles';

const styles = StyleSheet.create({
  ...ScreenStyles,
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    fontSize: 18,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    height: 56,
    width: '100%',
  },
  buttonLabel: {
    fontSize: 18,
  },
  snackbar: {
    bottom: 16,
  },
});

export default styles;
