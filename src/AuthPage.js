import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import './App.css';
import AppBody from './AppBody';
import NavBarMD from './Nav';
import { auth_url, isLoggedIn, login, redirect, asyncrequest, getCookie, acToken } from './Auth';

@observer
@inject("store")
export class AuthPage extends Component
{
    constructor()
    {
        super();
        this.setState({user:null});
    }
    getUserDetails()
    {
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + getCookie(acToken), this.fetchUserDetails.bind(this));
    }
    fetchUserDetails(data)
    {
        if (data && data.data.full_name && data.data.profile_picture) 
        this.setState({
            user: {
                name: data.data.full_name,
                dp: data.data.profile_picture
            }
        });
    }
    render()
    {
        if(this.state.user)
            return redirect("/");
        if(isLoggedIn()||login())
        {
            this.getUserDetails();
            return(<div><NavBarMD/><p>Loading user this.fetchUserDetails..</p></div> );
        }

        return (<div><NavBarMD/>
            <AppBody><Panel style={{padding:'0px 0px 20px 0px'}}>
            <h2>Please log in to continue</h2>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri=https://manuhegde.in"+auth_url+"&response_type=token"}>

                    <Button bsStyle="primary">
                    {(brands)?<FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>:""}
                        <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                    </Button>

                </a></Panel>
            </AppBody></div>
        );
    }
}
