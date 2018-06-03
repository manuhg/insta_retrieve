import React, {Component} from 'react';
import './App.css';
import AppBody from './AppBody';
import Pictures from './Pictures';
import * as Auth from './Auth';

function getHashVals() {
  var hashstr = Auth.getCookie(Auth.hashStr);
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
    this.state = {loggedId: (Auth.getCookie(Auth.acToken))? true: false };
  }
  logout()
  {
    this.setState({loggedId: false});
    Auth.logout();
  }
  login()
  {
    return Auth.goToLogin();
  }
  render() {
    const hashVals = getHashVals();
    const acTokenVal = Auth.getCookie(Auth.acToken);
    if (Auth.isLoggedIn()) 
      return (
        <AppBody logout={this.logout.bind(this)}>
          <Pictures accessToken={acTokenVal} hashvals={hashVals}/>
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
