import Datastore from 'store/Datastore';
import {RouterStore} from 'mobx-router';

const store = {
  store: new Datastore(),
  router: new RouterStore()
};

export default store;