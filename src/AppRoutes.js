import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthPage } from './AuthPage';
import { auth_url } from './Auth';
import App from './App';

import stores from './stores';
import { Provider } from 'mobx-react';

class AppRoutes extends Component {
  render() {
    return (
      <Provider store={stores}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path={auth_url} component={AuthPage} />
              <Route component={AuthPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default AppRoutes;