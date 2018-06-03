import React, { Component } from 'react';
import './App.css';

class Pictures extends Component 
{
    render()
    {
        return(<div><h2>your access token is: {this.props.accessToken} </h2> <h2>hash string: {this.props.hashvals}</h2></div>);
    }
}
export default Pictures;
