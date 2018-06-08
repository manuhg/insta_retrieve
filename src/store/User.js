import { asyncrequest } from 'common/Auth';
import { computed, action, observable } from 'mobx';
import { logout as auth_logout} from 'common/Auth';

class User 
{
    @observable acTokenVal
    @observable name
    @observable dp
    @observable waiting
    constructor(acTokenVal) 
    {
        this.waiting=false;
        this.doneFetching=null;
        console.log("Creating user actoken:"+acTokenVal);
        if (acTokenVal)
            this.login(acTokenVal);
    }
    @action nullify()
    {
        this.acTokenVal = this.name = this.dp = null;
    }
    @action login(acTokenVal) 
    {
        this.acTokenVal=acTokenVal;
        console.log("Logging in, access token:"+this.acTokenVal)
        this.waiting=false;
        if (this.acTokenVal)
            this.getUserDetails();
    }
    logout() 
    {
        this.nullify();
        auth_logout();
    }
    @computed get isLoggedIn()
    {
        if(this.name&&this.dp&&this.acTokenVal)
            return true;
        return false;
    }
    getUserDetails() 
    {
        this.waiting=true;
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + this.acTokenVal, this.fetchUserDetails.bind(this));
    }
    
    @action fetchUserDetails(data) 
    {
        console.log("Fetching user details")
        if (data && data.data.full_name && data.data.profile_picture) {
            this.name = data.data.full_name;
            this.dp = data.data.profile_picture;
        }
        this.waiting=false;
        if(this.doneFetching)
            this.doneFetching();
        console.log("No more waiting!")
    }
}
export default User;