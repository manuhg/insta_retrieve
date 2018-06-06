import store from 'store/Datastore';
import {RouterStore} from 'mobx-router';

 const Stores = {
    store:store,router:new RouterStore()
};

export default Stores;