import React from 'react';
import {ImageBackground, View} from 'react-native';
import Button from '../../components/Button/Button';
import styles from './styles';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const handleButtonPress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Button
          label="Messages"
          onPress={() => handleButtonPress('Messages')}
          style={styles.button}
        />
        <Button
          label="Settings"
          onPress={() => handleButtonPress('Settings')}
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
