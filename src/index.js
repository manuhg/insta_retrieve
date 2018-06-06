// import React from 'react';
// import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import './index.css';
// import AuthPage from './AuthPage';
// import App from './App';
// import {Stores,Context} from './stores';
// import { auth_url } from './Auth';
// import { Provider } from 'mobx-react';


// console.log(Stores);
// ReactDOM.render(
// <Provider store={Stores.store}>
//     <Router>
//         <div>
//             <Switch>
//                 <Route exact path="/" component={App} />
//                 <Route path={auth_url} component={AuthPage} />
//                 <Route component={AuthPage} />
//             </Switch>
//         </div>
//     </Router>
// </Provider>, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {MobxRouter, startRouter, Route,RouterStore} from 'mobx-router';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AuthPage from './AuthPage';
import App from './App';
import store from './stores';
import { auth_url } from './Auth';

const views={
    home: new Route({path:'/',component:<App/>}),
    auth: new Route({path:auth_url,component:<AuthPage/>})
}

startRouter(views,store);
ReactDOM.render(
<Provider store={store}>
<div>
      <h1>{store.store.title}</h1>
      <button onClick={() => store.router.goTo(views.home)}> go home</button>
      <MobxRouter/>
    </div>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
