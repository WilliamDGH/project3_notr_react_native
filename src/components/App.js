import React, {Component} from 'react';

// React Native Paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Custom Components
import Login from './Login'
import Main from './Main'

// Firebase config
import firebase from './../firebase-config'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      user : null
    }
  }

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        (user)? this.setState({ user }) : this.setState({ user: null })
      }
    )
  }

  render() {
    if (this.state.user) {
      return (
        <PaperProvider theme={theme}>
          <Main/>
        </PaperProvider>
      )
    }
    return (
      <PaperProvider theme={theme}>
        <Login />
      </PaperProvider>
    );
  }
}
