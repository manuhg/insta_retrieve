import React, { Component } from 'react';
import { observer , inject } from "mobx-react";

import 'resources/App.css';
import AppBody from 'common/AppBody';
import * as Auth from 'common/Auth';
import Pictures from 'pages/Pictures';

class App extends Component 
{
  constructor() 
  {
    super();
    console.log(this.props);
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
  render() {
    Auth.setCookie(Auth.hashStr, this.props.store.hashStr);
    if (this.props.store.user && this.props.store.isLoggedIn()) {
      this.props.store.hashStr = Auth.getCookie(Auth.hashStr);
      Auth.removeCookie(Auth.hashStr);
      return(<AppBody> <Pictures/></AppBody>);
    }
    else
      return (<AppBody><this.login /></AppBody>);
  }
}

export default inject('store')(observer(App));
