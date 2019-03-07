import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'

import { Card, TextInput } from 'react-native-paper'

import firebase from './../firebase-config'


export default class EditNote extends Component {
  static navigationOptions = {
    title: 'Notr',
    headerStyle: {
      backgroundColor: '#000000',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  constructor(props){
    super(props)
    this.state = {
      uid: this.props.navigation.state.params.uid,
      id: this.props.navigation.state.params.id,
    }
    this._handleChangeTitle = this._handleChangeTitle.bind(this)
    this._handleChangeContent = this._handleChangeContent.bind(this)
    this._fetchNote=this._fetchNote.bind(this)
  }

  componentDidMount(){
    this._fetchNote()
  }

  _fetchNote(){
    const dbref = firebase.database().ref().child(this.state.uid).child(this.state.id);
    dbref.on('value', snap => {
            this.setState({
              note: snap.val()
            })
          })
  }

  _handleChangeTitle (title) {
    const dbref = firebase.database().ref().child(this.state.note.uid).child(this.state.id);
    dbref.update({
      title: title
    })
  }

  _handleChangeContent (content) {
    const dbref = firebase.database().ref().child(this.state.note.uid).child(this.state.id);
    dbref.update({
      content: content
    })
  }

  render() {
    if (!this.state.note) {
      return(
        <Text>Loading</Text>
      )
    }
    return (
      <Card style={styles.card}>
        <TextInput
        onChangeText={this._handleChangeTitle}
        label="title"
        value={this.state.note.title}
        />
        <TextInput
        onChangeText={this._handleChangeContent}
        value={this.state.note.content}
        label="content"
        multiline={true}
        numberOfLines={12}
        />
      </Card>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '95%',
  },
})
