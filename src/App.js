import React, {Component} from 'react';
import './App.css';
import AppBody from './AppBody';
import Pictures from './Pictures';
import * as Auth from './Auth';


class App extends Component {
  constructor()
  {
    super();
    this.state = 
    {
      acTokenVal:Auth.getCookie(Auth.acToken),
      hashStr:window.location.hash||Auth.getCookie(Auth.hashStr)
    };
    console.log(this.state);
  }
  clearHashTags()
  {
    Auth.removeCookie(Auth.hashStr);
    this.setState({acTokenVal:this.state.acTokenVal,hashStr:null})
  }
  logout()
  {
    this.setState({acTokenVal: null,hashStr:null});
    Auth.logout();
  }
  login()
  {
    return Auth.goToLogin();
  }
  render() {
    Auth.setCookie(Auth.hashStr,this.state.hashStr);
    var hashVals = Auth.getHashVal(this.state.hashStr);
    
    
    if (this.state.acTokenVal&&Auth.isLoggedIn(this.state.acTokenVal)) 
      return (
        <AppBody logout={this.logout.bind(this)}>
          <Pictures accessToken={this.state.acTokenVal} hashvals={hashVals} clearHashTags={this.clearHashTags.bind(this)}/>
        </AppBody>
      );
    else 
      return (
        <AppBody>
          <this.login/>
        </AppBody>
      );

    }
  }

export default App;
