import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// React Native Paper
import { TextInput, Button, Card } from 'react-native-paper';

// Firebase config
import firebase from './../firebase-config'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      message: null
    }
    this._handleChangeEmail = this._handleChangeEmail.bind(this)
    this._handleChangePassword = this._handleChangePassword.bind(this)
    this._login = this._login.bind(this)
    this._signup = this._signup.bind(this)
  }

  _handleChangeEmail(email) {
    this.setState({ email });
  }

  _handleChangePassword(password) {
    this.setState({ password });
  }

  _login() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(reg.test(this.state.email) === false) {
      this.setState({message: 'please enter vaild email address'})
      return
    } else {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
          this.setState({ message : error.message })
        })
    }
  }

  _signup(){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(reg.test(this.state.email) === false) {
      this.setState({message: 'please enter vaild email address'})
      return
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(()=>{
        const user = firebase.auth().currentUser;
        firebase.database().ref().child(user.uid).push({
          title: `Welcome ${user.email}`,
          content: "Create your first note"
        })
        this._login()
      })
      .catch((error) => {
          this.setState({ message : error.message })
        })
    }
  }


  render() {
    let errorMessage = null
    if (this.state.message) {
      errorMessage = <Text style={styles.message}>{this.state.message}</Text>
    }
    return (
      <Card style={styles.container} >
        <Text style={styles.h1}>
        NotR
        </Text>
        <TextInput
        keyboardType='email-address'
        value={this.state.email}
        onChangeText={this._handleChangeEmail}
        style={styles.input}
        label="email"
        />
        <TextInput
        secureTextEntry={true}
        value={this.state.password}
        onChangeText={this._handleChangePassword}
        style={styles.input}
        label="password"
        />
        {errorMessage}
        <Button
        onPress={this._login}
        style={styles.signIn}
        mode='contained'>
          <Text
          style={{color: '#FFFFFF'}}>
            Log in
          </Text>
        </Button>
        <Button
        onPress={this._signup}
        style={styles.signUp}
        mode='contained'>
          Sign Up
        </Button>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 20,
  },
  h1: {
    backgroundColor: '#000000',
    paddingTop: '50%',
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  signIn: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    backgroundColor: '#000000',
  },
  signUp: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  message: {
    marginLeft: '5%',
    color: 'red',
  }
});
