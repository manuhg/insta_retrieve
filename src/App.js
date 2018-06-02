import React, {Component} from 'react';
import {
  Panel,
  Grid,
  Row,
  Col,
  Button,
  Badge
} from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

import './App.css';
import logo from './img/pickcel.png';
import AppBody from './AppBody';
import Pictures from './Pictures';
import { isLoggedIn ,goToLogin, logout} from './Auth';
import AuthPage from './AuthPage';

const cookies = new Cookies();
function splithash(str) {
  // in case user specifies multiple hashes var
  // hashvals=window.location.hash.split('#');
  var hashvals = str.split('#');
  for (var i = 0; i < hashvals.length; i++) 
    if (!hashvals[i]) 
      hashvals.splice(i, 1);
    }
  class App extends Component {
  constructor()
  {
    super();
    this.state = {
      accessToken: cookies.get('ac_token')
    };
  }
  logout()
  {
    this.setState({accessToken: null});
    logout();
  }
  login()
  {
    goToLogin();
  }
  render() {
    if (!this.state.accessToken) 
      return (
        <AppBody>Welcome to this app!</AppBody>
      );
    }
  }

export default App;
