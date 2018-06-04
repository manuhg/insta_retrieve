import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import './App.css';
import AppBody from './AppBody';
import { auth_url, isLoggedIn, login, redirect, asyncrequest, getCookie, acToken } from './Auth';

@inject("store")
@observer
export class AuthPage extends Component
{
    render()
    {
        if(this.props.store.isLoggedIn('synchronous'))
            return redirect("/");
        if(login())
        {
            this.props.store.setacessToken(getCookie(acToken));
            return(<AppBody><p>Loading user this.fetchUserDetails..</p></AppBody> );
        }

        return (
            <AppBody><Panel style={{padding:'0px 0px 20px 0px'}}>
            <h2>Please log in to continue</h2>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri=https://manuhegde.in"+auth_url+"&response_type=token"}>

                    <Button bsStyle="primary">
                    {(brands)?<FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>:""}
                        <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                    </Button>

                </a></Panel>
            </AppBody>
        );
    }
}
