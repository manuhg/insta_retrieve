import React, {Component} from 'react';
import {Panel,Grid,Row,Col,Button} from 'react-bootstrap';
import Retriever from './Retriever';

import './App.css';
class Pictures extends Component
{
    constructor()
    {
        super();
        this.state = {user: {name: null, dp: null}, data: null};
        this.retriever = new Retriever();
    }
    getUserDetails()
    {
        console.log("GET "+'https://api.instagram.com/v1/users/self/?access_token=' +  this.props.accessToken );
        this.retriever.getData('https://api.instagram.com/v1/users/self/?access_token=' + 
         this.props.accessToken, this.fetchUserDetails.bind(this));
    }
    getMediaByHashtag(hashtag)
    {
        this.retriever.getData('https://api.instagram.com/v1/tags/' + hashtag + 
        '/media/recent?access_token=' + this.props.accessToken, this.fetchMediaByHashtag.bind(this));
    }
    fetchUserDetails(data)
    {
        if(data && data.data.full_name && data.data.profile_picture)
          this.setState({user:{ name: data.data.full_name, dp: data.data.profile_picture}, data: data});
    }
    fetchMediaByHashtag(data)
    {
        if(data && data.data.full_name && data.data.profile_picture)
          this.setState({user:this.state.user, data: data});
    }
 
    render()
    {
        if (!this.props.accessToken) 
            return (
                <div>
                    <h3 style={{color: 'red'}}>Invalid access token</h3>
                </div>
            );
        if (!this.state.user.name||!this.state.user.dp) 
            return (
                <div>
                    <h3>Loading user details..</h3>
                </div>
            );
        return (
            <div>
                <h2>your access token is: {this.props.accessToken}</h2>
                <h2>hash string: {(this.props.hashvals)? this.props.hashvals.join(): ""}</h2>
                <Button bsStyle="primary" onClick={() => this.props.clearHashTags()}>clear tags</Button>
                <Panel>
                <Grid>
                <Row><Col md={10} mdOffset={1}><img src={this.state.user.dp}/></Col></Row>
                <Row><Col md={10} mdOffset={1}><h1>Hi {this.state.user.name}</h1></Col></Row>
                </Grid>
                </Panel>
            </div>
        );
    }
}
export default Pictures;
