import { asyncrequest } from 'common/Auth';
import { computed,action, observable } from 'mobx';
import { logout as auth_logout,acTokenIsValid} from 'common/Auth';

class User 
{
    @observable acTokenVal
    @observable name
    @observable dp
    @observable waiting = false;
    @observable data
    constructor(acTokenVal) 
    {
        this.error=false;
        this.errtag=''
        if (acTokenVal)
            this.login(acTokenVal);
    }
    @action nullify()
    {
        this.acTokenVal = this.name = this.dp = this.data = null;
    }
    @action login(acTokenVal) 
    {
        if(!acTokenVal && acTokenIsValid(acTokenVal))
        {
            console.log("access token :"+acTokenVal+" rejected");
            return;
        }
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
        console.log("Fetching user details")
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + this.acTokenVal, this.fetchUserDetails.bind(this));
    }
    getRecentMedia() {
        console.log("Fetching recent media")
        asyncrequest('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this))
    }
    getMediaByHashtag(hashtag) {
        hashtag=hashtag.trim()
        if(this.errtag===hashtag)
            return false;
        this.errtag=hashtag
        if(hashtag)
        {
            console.log("Fetching media with hashtag "+hashtag)
            asyncrequest('https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this));
        }
        else
            return false;
        return true;
    }
    getAllMedia() {
        asyncrequest('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + this.acTokenVal, this.fetchMediaData.bind(this))
    }

    @action fetchUserDetails(data,err)
    {
        this.error=err;
        if(err) this.data=null;
        if (data && data.data.full_name && data.data.profile_picture) {
            this.name = data.data.full_name;
            this.dp = data.data.profile_picture;
        }
        this.waiting=false;
        var op = []
        op.push("Fetching complete")
        if (err) op.push("Error")
        else op.push(data)
        console.log(op)
    }
    @action fetchMediaData(data,err)
    {
        this.error=err;
        if(err) this.data=null;
        if (data) {
            var imgdata = {};
            this.errtag=''
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
            this.data=imgdata;
        }
        var op = []
        op.push("Fetching complete")
        if (err) op.push("Error")
        else op.push(data)
        console.log(op)
    }
    getMediaByHashtags() {
       // if (!this.HashtagsSpecified)
           // ;//modal
        //for

    }
}
export default User;