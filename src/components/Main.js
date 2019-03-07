import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// React Native Paper
import { Avatar, Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Custom Components

export default class Main extends Component {
  render() {
    return (
      <Appbar style={styles.appbar}>
        <Appbar.Action color={'#FFFFFF'} icon="archive" onPress={() => console.log('Pressed archive')} />
        <Avatar.Text size={24} label="GA" />
        <Text style={styles.email}>1@ga.co</Text>
      </Appbar>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: '#FFFFFF',
  },
  appbar: {
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  email: {
    color: '#FFFFFF',
  }
});
