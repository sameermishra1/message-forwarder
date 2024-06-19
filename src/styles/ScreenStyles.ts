import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');
const ScreenStyles = StyleSheet.create({
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

export default ScreenStyles;
