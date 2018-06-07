import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import './resources/index.css';
import store from './store/store';
import AppRoutes from './Routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
      <AppRoutes/>
    </Provider>, document.getElementById('root')
  )
registerServiceWorker();