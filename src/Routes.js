import React from 'react';
import {Route} from 'mobx-router';

import AuthPage from './pages/AuthPage';
import App from './pages/App';
import { auth_url } from './common/Auth';

const app_routes = {
  home: new Route({path: '/', component: <App/>}),
  auth: new Route({path: auth_url, component: <AuthPage/>})
};

export default app_routes;
