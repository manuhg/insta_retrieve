import { asyncrequest, acTokenValMinLen } from 'common/Auth';
import { computed,action, observable } from 'mobx';

class User{
    @observable name =null;
    @observable dp =null;
    constructor(acTokenVal)
    {
        this.waiting=false;
        if(acTokenVal)
        {
            this.acTokenVal=acTokenVal;
            this.getUserDetails();
        }
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
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + this.acTokenVal, this.fetchUserDetails.bind(this));
    }
    @action fetchUserDetails(data)
    {
        if (data && data.data.full_name && data.data.profile_picture) 
        {
            this.name = data.data.full_name;
            this.dp= data.data.profile_picture;
        
        }
        this.waiting=false;
    }
}
export default User;