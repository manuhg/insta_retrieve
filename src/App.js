import React, { Component } from 'react';
import './App.css';
import AppBody from './AppBody';
import Pictures from './Pictures';
import * as Auth from './Auth';
import { observer } from "mobx-react";

@observer
@inject("store")
class App extends Component 
{
  constructor() 
  {
    this.props.store.logout=this.logout.bind(this);
    this.props.store.setacessToken(Auth.getCookie(Auth.acToken));
    this.props.store.hashStr = window.location.hash || Auth.getCookie(Auth.hashStr);
    document.body.onhashchange = this.onhashchange.bind(this);
    this.state={loggedIn:this.props.store.isLoggedIn()};
  }
  onhashchange()
  {
    this.props.store.hashStr=window.location.hash;
  }

  logout()
  {
    this.props.store.setacessToken(null);
    Auth.logout();
    this.setState({loggedIn:false});
  }
  login()
  {
    return Auth.redirect(Auth.auth_url);
  }
  render() 
  {
    Auth.setCookie(Auth.hashStr, this.props.store.hashStr);
    if (this.props.store.isLoggedIn()) {
      this.props.store.hashStr = Auth.getCookie(Auth.hashStr);
      Auth.removeCookie(Auth.hashStr);
      return
      (
        <AppBody logout={this.logout.bind(this)}>
          <Pictures />
        </AppBody>
      );
    }
    else {
      return (<AppBody><this.login /></AppBody>);
    }

  }
}

export default App;
