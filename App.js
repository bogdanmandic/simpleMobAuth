import React, { Component } from 'react';
import { View, AppRegistry, Text } from 'react-native';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import firebase from 'firebase';


export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDygmHAFF9kXTl1F3g-Yq4s1QmmxWOHgSs',
      authDomain: 'authentication-7e3f6.firebaseapp.com',
      databaseURL: 'https://authentication-7e3f6.firebaseio.com',
      projectId: 'authentication-7e3f6',
      storageBucket: 'authentication-7e3f6.appspot.com',
      messagingSenderId: '422314286686'
    });

    firebase.auth().onAuthStateChanged((user) => (user) ? this.setState({ loggedIn: true }) : this.setState({ loggedIn: false }));
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}> 
            Log Out 
          </Button>
        );  
      break;
      case false:
        return <LoginForm />;
      break;
      default:
        return <Spinner size="large" />;
      break;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        <View style={{height: 60}}>        
          {this.renderContent()}
        </View>
      </View>
    );
  };
};

AppRegistry.registerComponent('auth', () => App);

