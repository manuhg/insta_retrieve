import React, { Component } from 'react';
import { observer , inject } from "mobx-react";

import 'resources/App.css';
import AppBody from 'common/AppBody';
import * as Auth from 'common/Auth';
import Pictures from 'pages/Pictures';
import app_routes from 'Routes';

@inject("store")
@observer
class App extends Component 
{
  constructor(props) 
  {
    super(props);
    const {data}=this.props.store;

    data.login(Auth.getCookie(Auth.acToken));
    data.setHashStr(window.location.hash || Auth.getCookie(Auth.hashStr));
    document.body.onhashchange = this.onhashchange.bind(this);
  }
  onhashchange()
  {
    this.store.setHashStr(window.location.hash);
  }

  render() {
    const {data,router}=this.props.store;

    Auth.setCookie(Auth.hashStr, data.hashStr);
    if (data.user.isLoggedIn)
    {
      data.setHashStr(Auth.getCookie(Auth.hashStr));
      Auth.removeCookie(Auth.hashStr);
      return(<AppBody> <Pictures/></AppBody>);
    }
    else
      router.goTo(app_routes.auth,this.props.store);
  }
}

export default App;
