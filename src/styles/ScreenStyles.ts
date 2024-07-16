import {Dimensions, StyleSheet} from 'react-native';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

const {width} = Dimensions.get('window');
export const ScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    width: width * 0.8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: width * 0.8,
    backgroundColor: 'white',
  },
});

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007AFF',
    background: '#F0F4F8',
  },
};
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#0A84FF',
    background: '#1C1C1E',
  },
};

export const NavigationStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      backgroundColor: isDarkMode ? '#1C1C1E' : '#F0F4F8',
    },
    headerTint: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
  });
