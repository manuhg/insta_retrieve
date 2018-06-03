import React, { Component } from 'react';
import {  Button } from 'react-bootstrap';

import './App.css';

class Pictures extends Component 
{
    render()
    {
        return(<div><h2>your access token is: {this.props.accessToken} </h2> <h2>hash string: {(this.props.hashvals)?this.props.hashvals.join():""}
        </h2> <Button bsStyle="primary" onClick={()=>this.props.clearHashTags()}>clear hashtags </Button></div>);
    }
}
export default Pictures;
