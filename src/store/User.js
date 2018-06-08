import { asyncrequest } from 'common/Auth';
import { computed,action, observable } from 'mobx';
import { logout as auth_logout} from 'common/Auth';

class User 
{
    @observable acTokenVal
    @observable name
    @observable dp
    @observable waiting = false;
    @observable data
    constructor(acTokenVal) 
    {
        console.log("Creating user actoken:"+acTokenVal);
        if (acTokenVal)
            this.login(acTokenVal);
    }
    @action nullify()
    {
        this.acTokenVal = this.name = this.dp = this.data = null;
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
        console.log("No more waiting!")
    }
    getRecentMedia() {
        asyncrequest('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this))
    }
    getMediaByHashtag(hashtag) {
        asyncrequest('https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this));
    }
    getAllMedia() {
        asyncrequest('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this))
    }

    @action fetchMediaData(data) {
        if (data) {
            // if(data.meta && data.meta.err)
            //     data=null;
            var imgdata = {};
            for (var i = 0; i < data.data.length; i++) {
                var alt = (data.data[i].caption)
                    ? data.data[i].caption.text
                    : " ";
                imgdata[i] = {
                    img: data.data[i].images,
                    alt: alt,
                    link: data.data[i].link,
                    tags: data.data[i].tags
                };
            }
            // if(imgdata)
                this.data=imgdata;
        }
    console.log("No more waiting!")
    console.log(data);
    }
    getMediaByHashtags() {
       // if (!this.HashtagsSpecified)
           // ;//modal
        //for

    }
}
export default User;