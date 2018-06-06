import { asyncrequest } from 'common/Auth';
import { computed, action, observable } from 'mobx';
import { logout as auth_logout} from 'common/Auth';

class User 
{
    @observable acTokenVal
    @observable name
    @observable dp

    constructor(acTokenVal) 
    {
        this.nullify();
        if (acTokenVal)
            this.login(acTokenVal);
    }
    nullify()
    {
        this.acTokenVal = this.name = this.dp = null;
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
    @computed get isLoggedIn()
    {
        if(this.name&&this.dp&&this.acTokenVal)
            return true;
        return false;
    }
    @action fetchUserDetails(data) 
    {
        if (data && data.data.full_name && data.data.profile_picture) {
            this.name = data.data.full_name;
            this.dp = data.data.profile_picture;
        }
    }
}
export default User;