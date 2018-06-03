import React, {Component} from 'react';
import './App.css';
import AppBody from './AppBody';
import Pictures from './Pictures';
import * as Auth from './Auth';

function getHashVals(hashstr) 
{
  if(!hashstr)
    return null;
  // in case user specifies multiple hashes var
  var hashvals = hashstr.split('#');
  for (var i = 0; i < hashvals.length; i++) 
    if (!hashvals[i]) 
      hashvals.splice(i, 1);
  return hashvals;
}
class App extends Component {
  constructor()
  {
    super();
    this.state = {acTokenVal: (Auth.getCookie(Auth.acToken)) };
  }
  logout()
  {
    this.setState({acTokenVal: null});
    Auth.logout();
  }
  login()
  {
    return Auth.goToLogin();
  }
  render() {
    var hashStr=Auth.getCookie(Auth.hashStr)||window.location.hash;
    
    Auth.setCookie(Auth.hashStr,hashStr);
    var hashVals = getHashVals(hashStr);
    
    console.log("hashvals from app:"+hashVals+"\ntokenval:"+this.state.acTokenVal);
    
    if (this.state.acTokenVal) 
      return (
        <AppBody logout={this.logout.bind(this)}>
          <Pictures accessToken={this.state.acTokenVal} hashvals={hashVals}/>
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
