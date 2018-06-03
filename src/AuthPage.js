import React, {Component} from 'react';
import {  Button } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import './App.css';
import AppBody from './AppBody';
import { auth_url, isLoggedIn ,login, redirect} from './Auth';


export class AuthPage extends Component
{
    render()
    {
        if(isLoggedIn()||login())
            return redirect("/");

        return (
            <AppBody>
            <h1>You need to be logged in.</h1>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri=https://manuhegde.in"+auth_url+"&response_type=token"}>

                    <Button bsStyle="primary"><FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                        <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                    </Button>

                </a>
            </AppBody>
        );
    }
}
