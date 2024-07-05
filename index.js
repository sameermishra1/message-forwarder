import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import crashlytics from '@react-native-firebase/crashlytics';

AppRegistry.registerComponent(appName, () => App);
