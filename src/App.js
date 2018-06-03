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
    if(this.state.hashStr&&this.state.hashStr.indexOf('#')<0)
      this.state.hashStr=null;
    console.log("App state obj:\n");
    console.log(this.state);
  }
  clearHashTags()
  {
    Auth.removeCookie(Auth.hashStr);
    this.setState({acTokenVal:this.state.acTokenVal,hashStr:null})
    window.location.hash='';
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
    if(this.state.hashStr)
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
