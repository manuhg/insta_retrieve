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
        <MobxRouter/>
    </Provider>, document.getElementById('root')
  )
registerServiceWorker();
