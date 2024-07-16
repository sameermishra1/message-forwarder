import {StyleSheet} from 'react-native';
import {ScreenStyles} from '../../styles/ScreenStyles';

export const styles = StyleSheet.create({
  ...ScreenStyles,
  topMargin: {
    marginTop: 10,
  },
});

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  topContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consentText: {
    marginRight: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 16,
    borderRadius: 8,
  },
  buttonContent: {
    height: 56,
    width: '100%',
  },
  buttonLabel: {
    fontSize: 18,
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  darkModeText: {
    marginRight: 8,
  },
  icon: {
    fontSize: 24,
  },
  permissionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  permissionContent: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
  },
});
