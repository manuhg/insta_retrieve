import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import IAuth from './IAuth';
import App from './App';
class AppRoutes extends Component
{
  render()
  {
    return (
      <Router>
        <div>
        <Route exact path="/" component={App} />
        <Route path="/iauth" component={IAuth}/>
          </div>
      </Router>
    );
  }
}
export default AppRoutes;