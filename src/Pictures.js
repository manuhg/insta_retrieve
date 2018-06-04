import React, {Component} from 'react';
import {Panel,Grid,Row,Col,Button} from 'react-bootstrap';
import {asyncrequest} from './Auth';

import './App.css';

function Image(props)
{
    return (<Col className="usermedia" md={3}><img src={props.src} alt={props.alt}/></Col>);
}

class Pictures extends Component
{
    constructor()
    {
        super();
        this.state = {user: {name: null, dp: null}, data: null,imagedata: false};
    }
    getUserDetails()
    {
        asyncrequest('https://api.instagram.com/v1/users/self/?access_token=' + 
         this.props.accessToken, this.fetchUserDetails.bind(this));
    }
    getRecentMedia()
    {
        asyncrequest('https://api.instagram.com/v1/users/self/media/recent/?access_token=' +
        this.props.accessToken,this.fetchMediaData.bind(this))
    }
    getMediaByHashtag(hashtag)
    {
        asyncrequest('https://api.instagram.com/v1/tags/' + hashtag + 
        '/media/recent?access_token=' + this.props.accessToken, this.fetchMediaData.bind(this));
    }
    getAllMedia()
    {
        asyncrequest('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' +
        this.props.accessToken,this.fetchMediaData.bind(this))
    }
    fetchUserDetails(data)
    {
        //console.log("fetching user details..");
        // console.log(data);
        if(data && data.data.full_name && data.data.profile_picture)
          this.setState({user:{ name: data.data.full_name, dp: data.data.profile_picture}, data: data, imagedata: false});
    }
    fetchMediaData(data)
    {
        if(data)
        {
            var imgdata={};
            for(var i=0;i<data.data.length;i++)
            {
                var alt=(data.data[i].caption)?data.data[i].caption.text:" ";
                imgdata[i]={src:data.data[i].link,alt: alt};
            }
            this.setState({user:this.state.user, data: imgdata, imagedata: true});
        }
    }
    
    render()
    {
        if (!this.props.accessToken) 
            return (<div><h3 style={{color: 'red'}}>Invalid access token</h3></div>);
        if (this.state.user.name===null||this.state.user.dp===null) 
        {
            this.getUserDetails();//calls an async function that changes the state
            return (<div><h3>Loading user details..</h3></div>);
        }
        var Images=()=>(<Row><Col>&nbsp;</Col></Row>);
        if(this.state.imagedata && this.state.data)
        {
            var Imglist=[];
            
            for(var i in this.state.data)
            {
                console.log(this.state.data[i].src,this.state.data[i].alt);
                Imglist.push(<Image key={i} src={this.state.data[i].src} alt={this.state.data[i].alt}/>);
            }
            if(Imglist && Imglist.length>0)
                Images=()=><Row>{Imglist}</Row>
        }
        console.log(Images);
        return (
            <div>
                <Panel>
                <Grid style={{padding:'10px 0px 10px 0'}}>
                <Row><Col md={10} mdOffset={1}><img alt="dp" className="instadp" src={this.state.user.dp}/></Col></Row>
                <Row><Col md={10} mdOffset={1}><h2>Hi {this.state.user.name}</h2></Col></Row>
                <Row>
                <Col md={3}><Button onClick={()=>this.getAllMedia()}>All Photos</Button></Col>

                <Col md={3}><Button onClick={()=>this.getRecentMedia()}>Recent Photos</Button></Col>
                <Col md={3}>
                {(this.props.hashvals)?<Button onClick={()=>this.getMediaByHashtag()}>Photos with {this.props.hashvals.join()}</Button> : <span>&nbsp;</span>}
                </Col></Row>
                <Images/>
                </Grid>
                </Panel>
            </div>
        );
    }
}
export default Pictures;
