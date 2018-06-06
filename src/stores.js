import store from './Datastore';
import {RouterStore} from 'mobx-router';

 const Stores = {
    store:store,router:new RouterStore()
};

export default Stores;