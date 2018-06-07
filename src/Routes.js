import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import AuthPage from './pages/AuthPage';
import App from './pages/App';
import { auth_url } from './common/Auth';

const app_routes = ()=>
<Router>
    <div>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path={auth_url} component={AuthPage} />
            <Route component={AuthPage} />
        </Switch>
    </div>
</Router>

export default app_routes;

