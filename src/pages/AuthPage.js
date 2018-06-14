import React, { Component } from 'react';
import { Button } from 'mdbreact';
import AppBody from 'common/AppBody';
import 'mobx';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { observer , inject } from "mobx-react";
import { login, auth_url, authorized_domains, getCookie, acToken, acTokenIsValid } from 'common/Auth';

@inject("store")
@observer
class AuthPage extends Component
{
    findIndex()
    {
        for(var i=0;i<authorized_domains.length;i++)
            if(window.location.origin===authorized_domains[i])
                return i;
        return 0;//by default go to manuhegde.in
    }
    render()
    {
        const {store}=this.props;
        var current_domain=window.location.origin+'/';
        console.log("current url: "+current_domain);

        if(login()&&acTokenIsValid())
        {
            store.login(getCookie(acToken));
            return (<AppBody> <div><h2>Logging in..</h2><h4>Please Wait</h4></div></AppBody>);
        }

        return (<AppBody> 
            <div>
            <br/><br/>
            <h3>Welcome to Pickcel Instagram Photo Retriever</h3>
            <h4>Please log in with your instagram account so that we can retrieve the media in your account.</h4>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri="+current_domain+auth_url+"&response_type=token&scope=basic+public_content"}>
                    <Button>
                    {(brands)?<FontAwesomeIcon style={{float:'left'}} icon={['fab', 'instagram']} size='4x'/>:""}
                        <h4>Login with Instagram</h4>
                    </Button>
                </a>
            <br/><br/>
            </div>    
        </AppBody>);
    }
}
export default AuthPage;