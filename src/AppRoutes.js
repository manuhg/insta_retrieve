import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {AuthPage,auth_url} from './AuthPage';
import App from './App';
class AppRoutes extends Component
{
  render()
  {
    return (
      <Router>
        <div>
        <Route exact path="/" component={App} />
        <Route path={"/"+auth_url} component={AuthPage}/>
          </div>
      </Router>
    );
  }
}
export default AppRoutes;