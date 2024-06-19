import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Settings from './screens/Settings/Settings';
import Messages from './screens/Messages/Messages';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
