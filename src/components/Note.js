import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

// React Native Paper
import { Button, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

 const Note = (props) => {
  return (
      <Card elevation={4} onPress={() => props.navigate('EditNote', {uid: props.note.uid, id: props.id})}>
      <Card.Title title={props.note.title} />
      <Card.Content>
        <Text>{props.note.content}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
        onPress={() => props.delete(props.id)}>Delete</Button>
      </Card.Actions>
    </Card>
  )
}

export default Note
