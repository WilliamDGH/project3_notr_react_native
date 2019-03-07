import React, {Component} from 'react';

// React Native Paper
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Custom Components
import Login from './Login'
import Main from './Main'
import EditNote from './EditNote'

// Firebase config
import firebase from './../firebase-config'

// React Navigator
import { createStackNavigator, createAppContainer } from "react-navigation";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  }
};

const AppNavigator = createStackNavigator(
  {
    Home: Main,
    EditNote: EditNote
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

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
          <AppContainer />
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
