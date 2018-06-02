import React, { Component } from 'react';
import './App.css';
import AppBody from './AppBody';

class Pictures extends Component 
{
    render()
    {
        return(
            <div><AppBody>
            <h2>your access token is: {this.props.accessToken}</h2></AppBody></div>
        );
    }
}
export default Pictures;
