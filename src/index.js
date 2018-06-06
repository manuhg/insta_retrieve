import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {MobxRouter, startRouter} from 'mobx-router';

import './resources/index.css';
import store from './store/store';
import app_routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

startRouter(app_routes,store);
ReactDOM.render(
    <Provider store={store}>
      <div>
        <h1>{store.store.title}</h1>
        <button onClick={() => store.router.goTo(app_routes.home)}> go home</button>
        <MobxRouter/>
      </div>
    </Provider>, document.getElementById('root')
  )
registerServiceWorker();
