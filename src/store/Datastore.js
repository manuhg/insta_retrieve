import {  acTokenValMinLen } from 'common/Auth';
import { computed,action, observable } from 'mobx';
import User from 'store/User';
 class Datastore
{
    @observable addHash=true;
    @observable user = null;
    @observable acTokenVal = null;
    @observable hashStr = ""
    //@observable hashVals = []
    constructor()
    {
        this.logout=null;
        this.title="hello";
    }

    @computed get hashVals()
    {
            if (!this.hashstr || this.hashStr.indexOf('#')===-1) 
                return [];

            // in case user specifies multiple hashes
            var hashvals_arr = this.hashstr.split('#');
            for (var i = 0; i < hashvals_arr.length; i++) 
                if (!hashvals_arr[i])
                    hashvals_arr.splice(i, 1);
            for ( i = 0; i < hashvals_arr.length; i++)
            {
                hashvals_arr[i]=hashvals_arr[i].trim();
                hashvals_arr[i]=hashvals_arr[i].replace(/,\s*$/,"");
                if(this.addHash)
                    hashvals_arr[i]='#'+hashvals_arr[i]; 
            }
            //this.hashVals.replace(hashvals_arr);
            return hashvals_arr;
    }
    @computed get userStatus()
    {
        if(!this.acTokenVal)
            this.user=null;
        else if(this.acTokenVal&&this.acTokenVal.length>acTokenValMinLen)
        {
            this.user=new User(this.acTokenVal);
            return true;
        }
        return false;
    }
    @action setHashStr(val)
    {
        this.hashStr=val;
        return this.hashVals();
    }
    @action setacessToken(acTokenVal)
    {
        this.acTokenVal=acTokenVal;
        return this.userStatus();
    }

    isLoggedIn(sync)
    {
        if(this.user&&this.user.isLoggedIn(sync))
            return true;
        return false;
    }
}

export default Datastore;
