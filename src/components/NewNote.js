import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// React Native Paper
import { Button, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

 const Note = () => {
  return (
    <Card>
    <Card.Title title="Card Title" />
    <Card.Content>
      <Text>Note content. Note content. Note content. </Text>
    </Card.Content>
    <Card.Actions>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Card.Actions>
  </Card>
  )
}

export default Note
