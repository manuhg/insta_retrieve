import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { observer , inject } from "mobx-react";
import { login, auth_url, authorized_domains, getCookie, acToken, acTokenIsValid } from 'common/Auth';

@inject("store")
@observer
class AuthPage extends Component
{
    constructor()
    {
        super();
        this.state={redirect:false};
    }
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
        console.log(current_domain);
        console.log("User is "+((!store.user.isLoggedIn)?"not":"")+" Logged in");
        if(store.user.waiting)
            return (<div><h2>Logging in..</h2><h4>Please Wait</h4></div>);

        if(acTokenIsValid())
        {
            //return redirect("/");
            return("Redirecting..");
        }
        if(login())
        {
            store.login(getCookie(acToken));
            this.setState({redirect:true});
            return (<div><h2>Logging in..</h2><h4>Please Wait</h4></div>);
        }

        return (
            <Panel style={{padding:'0px 0px 20px 0px'}}>
            <h2>Please log in to continue</h2>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri="+current_domain+auth_url+"&response_type=token"}>
                    <Button bsStyle="primary">
                    {(brands)?<FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>:""}
                        <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                    </Button>
                </a>
            </Panel>    
        );
    }
}
export default AuthPage;