import { computed,action, observable } from 'mobx';
import React from 'react';

import User from 'store/User';
import HashtagModal from 'common/HashtagModal';

class Datastore 
{
    @observable addHash = true;
    @observable user = null;
    @observable hashStr = ""
    @observable modal = {
        @observable show:false,
        @observable title:"",
        @observable onSubmit:null,
        @observable children:null};
    constructor() 
    {
        this.user=new User();
        this.logout_=this.logout.bind(this);
    }
    login(acTokenVal)
    {
        this.user.login(acTokenVal);
    }
    logout()
    {
        if(this.user)
            this.user.logout();
        this.login(null); //create a new null user object //enable if components are not updating
    }
    @computed get hashVals() 
    {
        if (!this.hashStr || this.hashStr.indexOf('#') === -1)
            return [];

        // in case user specifies multiple hashes
        var hashvals_arr = this.hashStr.split('#');
        for (var i = 0; i < hashvals_arr.length; i++)
            if (!hashvals_arr[i])
                hashvals_arr.splice(i, 1);
        for (i = 0; i < hashvals_arr.length && hashvals_arr[i]; i++) {
            hashvals_arr[i] = hashvals_arr[i].trim();
            hashvals_arr[i] = hashvals_arr[i].replace(/,\s*$/, "");
            if (this.addHash)
                hashvals_arr[i] = '#' + hashvals_arr[i];
        }
        return hashvals_arr;
    }
    @computed get hashVals_concat()
    {
        return this.hashVals.join('');
    }
    @action setHashStr(val) {
        val=(!val||val==='#')?' ':val;
        this.hashStr = val;
    }

    @action showModal(modalTitle, ModalBody,onSubmit) {
        if (modalTitle && ModalBody) {
            this.modal.show = true
            this.modal.title = modalTitle
            this.modal.onSubmit = onSubmit
            this.modal.children =()=> <ModalBody/>
        }
    }
    @action getHashtagsMedia()
    {
        this.user.getMediaByHashtag(this.hashVals_concat, ()=>this.showModal("Enter hashtags", () => <HashtagModal />, () => <span>&nbsp;</span>))

    }
}

export default Datastore;
