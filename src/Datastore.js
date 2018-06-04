import { asyncrequest, acTokenValMinLen } from './Auth';
import { computed, observable } from 'mobx';

class User{
    @observable name =null;
    @observable dp =null;
    constructor(acTokenVal)
    {
        this.waiting=false;
        if(!acTokenVal)
            this.getUserDetails();
    }
    isLoggedIn(sync)
    {
        if(sync)
            while(this.waiting);
        return (this.name && this.dp);
    }
    getUserDetails()
    {
        this.waiting=true;
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + acTokenVal, this.fetchUserDetails.bind(this));
    }
    fetchUserDetails(data)
    {
        if (data && data.data.full_name && data.data.profile_picture) 
        {
            this.name = data.data.full_name;
            this.dp= data.data.profile_picture;
        
        }
        this.waiting=false;
    }
}
export default class Datastore
{
    @observable addHash=true;
    @observable user = null;
    @observable acTokenVal = null;
    @observable hashStr = ""
    //@observable hashVals = []
    constructor()
    {
        this.logout=null;
    }

    @computed get hashVals()
    {
            if (!this.hashstr || this.hashStr.indexOf('#')==-1) 
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
        else if(this.acTokenVal&&this.acTokenVal.length>acTokenValValMinLen)
        {
            this.user=new User(this.acTokenVal);
            return true;
        }
        return false;
    }
    setHashStr(val)
    {
        this.hashStr=val;
        return hashVals();
    }
    setacessToken(acTokenVal)
    {
        this.acTokenVal=acTokenVal;
        return userStatus();
    }

    isLoggedIn(sync)
    {
        if(this.user&&this.user.isLoggedIn(sync))
            return true;
        return false;
    }
}