import React, {Component,Children} from 'react';
import { Panel, Grid, Row, Col, Button, Badge } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

import './App.css';
import logo from './img/pickcel.png';
import AppBody from './AppBody';
import { isLoggedIn ,login} from './Auth';


const cookies = new Cookies();

export const auth_url ='iauth';
export class AuthPage extends Component
{
    render()
    {
        if(isLoggedIn())
            return true;
        if(login())
            return (<div><Redirect to="/"/></div>);

        return (
            <AppBody>
            <h1>You need to be logged in.</h1>
                <a
                    href={"https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri=https://manuhegde.in/"+auth_url+"&response_type=token"}>

                    <Button bsStyle="primary"><FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                        <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                    </Button>

                </a>
            </AppBody>
        );
    }
}
