import { asyncrequest, acTokenValMinLen } from 'common/Auth';
import { computed, action, observable } from 'mobx';
import { logout as auth_logout} from 'common/Auth';

class User 
{
    @observable acTokenVal
    @observable name
    @observable dp
    @observable isLoggedIn

    constructor(acTokenVal) 
    {
        this.nullify();
        if (acTokenVal)
            this.login(acTokenVal);
    }
    nullify()
    {
        this.acTokenVal = this.name = this.dp = null;
        this.isLoggedIn = false;
    }
    login(acTokenVal) 
    {
        this.acTokenVal=acTokenVal;
        if (this.acTokenVal)
            this.getUserDetails();
        else
            this.nullify();
    }

    logout() 
    {
        this.nullify();
        auth_logout();
    }

    getUserDetails() 
    {
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + this.acTokenVal, this.fetchUserDetails.bind(this));
    }

    @action fetchUserDetails(data) 
    {
        if (data && data.data.full_name && data.data.profile_picture) {
            this.name = data.data.full_name;
            this.dp = data.data.profile_picture;

        }
        this.waiting = false;
    }
}
export default User;