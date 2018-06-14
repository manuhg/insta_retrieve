import React, {Component} from 'react';
import 'mobx';

import {observer, inject} from "mobx-react";
import 'resources/App.css';
import * as Auth from 'common/Auth';
import Pictures from 'pages/Pictures';
import AuthPage from './AuthPage';

@inject("store")
@observer
class App extends Component
{
  constructor(props)
  {
    super(props);
    const {store} = this.props;

    document.body.onhashchange = this.onhashchange.bind(this);

    store.login(Auth.getCookie(Auth.acToken));
    var hstr = window.location.hash || Auth.getCookie(Auth.hashStr);
    if (hstr) 
      hstr = Auth.removeacToken(hstr.split('#'))
    store.setHashStr(hstr);
  }
  onhashchange()
  {
    this.props.store.setHashStr(window.location.hash);
  }

  render() {
    const {store} = this.props;
    Auth.setCookie(Auth.hashStr, store.hashStr);
    if (store.user.isLoggedIn) {
      Auth.removeCookie(Auth.hashStr);
      return (<Pictures/>);
    } else 
      return (<AuthPage/>);

    }
  }

export default App;
