import React, { Component } from 'react';
import { observer , inject } from "mobx-react";

import 'resources/App.css';
import AppBody from 'common/AppBody';
import * as Auth from 'common/Auth';
import Pictures from 'pages/Pictures';

@inject("store")
@observer
class App extends Component 
{
  constructor(props) 
  {
    super(props);
    const {store}=this.props;
    console.log(store);

    store.login(Auth.getCookie(Auth.acToken));
    store.setHashStr(window.location.hash || Auth.getCookie(Auth.hashStr));
  }
  onhashchange()
  {
    this.store.setHashStr(window.location.hash);
  }
  render() {
    const {store}=this.props;
    
    Auth.setCookie(Auth.hashStr, store.hashStr);
    document.body.onhashchange = undefined;
    if (store.user.isLoggedIn)
    {
      window.location.hash=Auth.getCookie(Auth.hashStr);
      Auth.removeCookie(Auth.hashStr);
      document.body.onhashchange = this.onhashchange.bind(this);
      return(<AppBody> <Pictures/></AppBody>);
    }
    else
      return Auth.redirect(Auth.auth_url);
  }
}

export default App;
