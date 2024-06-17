import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native';
import RequestMessage from './RequestMessage';
import SettingsScreen from './SettingsScreen';

class App extends Component {
  state = {
    count: 0,
    message: '',
    showSettings: false,
  };
  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
        <View>
          <RequestMessage />
        </View>
        <View style={styles.container}>
          {this.state.showSettings ? (
            <SettingsScreen />
          ) : (
            <Button
              title="Go to Settings"
              onPress={() =>
                this.setState({
                  showSettings: true,
                })
              }
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
