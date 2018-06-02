import React, {Component,Children} from 'react';
import { Panel, Grid, Row, Col, Button, Badge } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

import './App.css';
import logo from './img/pickcel.png';
import AppBody from './AppBody';
import Pictures from './Pictures';
import IAuth from './IAuth';


const cookies = new Cookies();

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      accessToken: null
    };
  }

  render() {
    console.log(this.props);
    if (!this.state.accessToken) 
      return (<AppBody>Welcome to this app!</AppBody>);
    }
  }

export default App;
