import { computed,action, observable } from 'mobx';
import User from 'store/User';

class Datastore 
{
    @observable addHash = true;
    @observable user
    @observable hashStr = ""
    constructor() 
    {
        this.user=new User();
    }
    login(acTokenVal)
    {
        this.user.login(acTokenVal);
    }
    logout()
    {
        this.user.logout();
        this.login(null); //create a new null user object //enable if components are not updating
    }
    @computed get hashVals() 
    {
        if (!this.hashstr || this.hashStr.indexOf('#') === -1)
            return [];

        // in case user specifies multiple hashes
        var hashvals_arr = this.hashstr.split('#');
        for (var i = 0; i < hashvals_arr.length; i++)
            if (!hashvals_arr[i])
                hashvals_arr.splice(i, 1);
        for (i = 0; i < hashvals_arr.length && hashvals_arr[i]; i++) {
            hashvals_arr[i] = hashvals_arr[i].trim();
            hashvals_arr[i] = hashvals_arr[i].replace(/,\s*$/, "");
            if (this.addHash)
                hashvals_arr[i] = '#' + hashvals_arr[i];
        }
        //this.hashVals.replace(hashvals_arr);
        return hashvals_arr;
    }

    @action setHashStr(val) {
        val=(!val||val==='#')?' ':val;
        this.hashStr = val;
        // var arr=this.hashStr.split('#')
        // for (var i = 0; i < arr.length; i++)
        //     if (!arr[i])
        //         arr.splice(i, 1);
        // this.hashStr='#'+arr.join('#');
        // console.log("sethashstr:",arr,'=>',this.hashStr)
        
    }

}

export default Datastore;
