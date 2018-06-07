import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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