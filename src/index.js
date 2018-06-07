import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import './resources/index.css';
import store from './store/store';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, document.getElementById('root')
  )
registerServiceWorker();