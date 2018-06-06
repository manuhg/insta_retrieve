import React, { Component } from 'react';
import { observer , inject } from "mobx-react";

import 'resources/App.css';
import AppBody from 'common/AppBody';
import * as Auth from 'common/Auth';
import Pictures from 'pages/Pictures';

class App extends Component 
{
  constructor(props) 
  {
    super(props);
    const {store}=this.props.store;
    store.login(Auth.getCookie(Auth.acToken));
    store.setHashStr(window.location.hash || Auth.getCookie(Auth.hashStr));
    document.body.onhashchange = this.onhashchange.bind(this);
  }
  onhashchange()
  {
    this.store.setHashStr(window.location.hash);
  }

  login()
  {
    return Auth.redirect(Auth.auth_url);
  }
  render() {
    const {store}=this.props.store;

    Auth.setCookie(Auth.hashStr, store.hashStr);
    if (store.user.isLoggedIn)
    {
      store.setHashStr(Auth.getCookie(Auth.hashStr));
      Auth.removeCookie(Auth.hashStr);
      return(<AppBody> <Pictures/></AppBody>);
    }
    else
      return (<AppBody><this.login /></AppBody>);
  }
}

export default inject('store')(observer(App));
