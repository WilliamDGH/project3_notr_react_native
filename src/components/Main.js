import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

// React Native Paper
import { Avatar, Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Firebase Config
import firebase from './../firebase-config'

// Custom Components
import Note from './Note'

export default class Main extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(){
    super()
    this.state = {
      user: null,
      notes : null,
      focus: null
    }
    this._fetchNotes = this._fetchNotes.bind(this)
    this._deleteNote = this._deleteNote.bind(this)
    this._createNewNote = this._createNewNote.bind(this)
  }

  componentDidMount(){
    this._fetchNotes()
  }

  _fetchNotes(){
  firebase.auth().onAuthStateChanged(
    (user) => {
      if(user) {
        this.setState({ user })
        const dbref = firebase.database().ref().child(this.state.user.uid).orderByChild('timeStamp')
        dbref.on('value', snap => {
          this.setState({
            notes: snap.val()
          })
        })
      } else {
        this.setState({ user: null })
      }
    })
}

_deleteNote (id) {
    const dbref = firebase.database().ref().child(this.state.user.uid).child(id)
    dbref.remove()
  }

_signOut () {
  firebase.auth().signOut();
}

_createNewNote = () => {
  const dbref = firebase.database().ref().child(this.state.user.uid)
  const newNote = dbref.push({
    title: "new note",
    content: "new note",
    uid: this.state.user.uid
  }).key
  this.props.navigation.navigate('EditNote', {uid: this.state.user.uid, id: newNote})
}

  render() {
    if(this.state.notes === null) {
      return(
        <View>
          <Text>Loading...</Text>
        </View>)
    }

    return (
      <View>
        <Appbar style={styles.appbar}>
          <Appbar.Action color={'#FFFFFF'} icon="add" onPress={this._createNewNote} />
          <Appbar.Action color={'#FFFFFF'} icon="delete" onPress={this._signOut} />
          <Avatar.Text size={24} label="GA" />
          <Text style={styles.email}>{this.state.user.email}</Text>
        </Appbar>
        <ScrollView>
        {this.state.notes !== null && Object.keys(this.state.notes).reverse().map((key)=>{
            return <View  key={key} style={styles.note}><Note delete={this._deleteNote} id={key} note={this.state.notes[key]} navigate={this.props.navigation.navigate}/></View>
          })}
        </ScrollView>

      </View>
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
  },
  note: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  }
});
