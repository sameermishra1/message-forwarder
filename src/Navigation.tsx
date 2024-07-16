import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Settings from './screens/Settings/Settings';
import Messages from './screens/Messages/Messages';
import MessageList from './screens/MessageList/MessageList';
import SenderMessages from './models/SenderMessages';
import {NavigationStyles} from './styles/ScreenStyles';

const Stack = createStackNavigator();

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function Navigation({
  isDarkMode,
  setIsDarkMode,
}: NavigationProps) {
  const styles = NavigationStyles(isDarkMode);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: styles.headerTint.color,
        }}>
        <Stack.Screen name="Home" options={{title: 'Home'}}>
          {props => (
            <HomeScreen
              {...props}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Message" component={MessageList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export type RootStackParamList = {
  MessageList: {senderMessage: SenderMessages};
};
