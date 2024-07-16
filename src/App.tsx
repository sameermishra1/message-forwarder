import React, {useState} from 'react';
import Navigation from './Navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from './styles/ScreenStyles';

const App: React.FC = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </PaperProvider>
  );
};

export default App;
