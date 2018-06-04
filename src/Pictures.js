import React, { Component } from 'react';
import { Modal, Well, Panel, Grid, Row, Col, Button, Thumbnail, Tabs, Tab } from 'react-bootstrap';
import { asyncrequest } from './Auth';
import HashTagModal from './HashTagModal';
import './App.css';

function Image(props) {
    var data=props.data;
    if(!data) return(<Col></Col>);
    console.log(data);
    return (
        <Col className="imgCol" md={3}>
            
                <Thumbnail className="imgThumb" responsive href={data.img.standard_resolution.url} src={data.img.standard_resolution.url} alt={data.alt}>
                <div className="infodiv"><h5>{data.alt}</h5><a href={data.link}> <p style={{color:'blue'}}>{data.tags}</p></a></div>
                 </Thumbnail>
        </Col>
    );
}

@observer
@inject("store")
class Pictures extends Component
{
    constructor()
    {
        super();
        this.state = {
            user: {
                name: null,
                dp: null
            },
            data: null,
            imagedata: false
        };
        this.HashtagsSpecified=false;
    }
    getRecentMedia()
    {
        asyncrequest('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.props.accessToken, this.fetchRecentMedia.bind(this))
    }
    getMediaByHashtag(hashtag)
    {
        asyncrequest('https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + this.props.accessToken, this.fetchMediaData.bind(this));
    }
    getAllMedia()
    {
        asyncrequest('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + this.props.accessToken, this.fetchMediaData.bind(this))
    }
  
    fetchMediaData(data)
    {
        if (data)
            this.setState({user: this.state.user, data: data, imagedata: true});
    }
    fetchRecentMedia(data)
    {
        
        if (data) {
            var imgdata = {};
            for (var i = 0; i < data.data.length; i++) {
                var alt = (data.data[i].caption)
                    ? data.data[i].caption.text
                    : " ";
                imgdata[i] = {
                    img: data.data[i].images,
                    alt: alt,
                    link:data.data[i].link,
                    tags:data.data[i].tags
                };
            }
            this.setState({user: this.state.user, data: imgdata, imagedata: true});
        }
    }
    getMediaByHashtags()
    {
        if(!this.HashtagsSpecified)
        ;//modal
        //for

    }
    clearHashTags()
    {
      window.location.hash='';
    }
    render()
    {
        if(this.props.hashvals && this.props.hashvals.length>1)
            this.HashtagsSpecified=true;
        if (!this.props.accessToken) 
            return (
                <div>
                    <h3 style={{
                        color: 'red'
                    }}>Invalid access token</h3>
                </div>
            );
        // if (this.state.user.name === null || this.state.user.dp === null) {
        //     this.getUserDetails(); //calls an async function that changes the state
        //     return (
        //         <div>
        //             <h3>Loading user details..</h3>
        //         </div>
        //     );
        // }
        var Images = () => (
            <Row>
                <Col>&nbsp;</Col>
            </Row>
        );
        if (this.state.imagedata && this.state.data) {
            var Imglist = [];
            for (var i in this.state.data) {
                Imglist.push(<Image key={i} data={this.state.data[i]}/>);
            }
            if (Imglist && Imglist.length > 0) 
                Images = () =><Row><Col md={10} mdOffset={1}><Row>{Imglist}</Row></Col></Row>;
            }
        return (
            <div><NavBarMD logout={this.props.logout} />
                <Panel>
                <Grid style={{padding:'10px 0px 10px 0'}}>
                <Row><Col md={10} mdOffset={1}><img alt="dp" className="instadp" src={this.state.user.dp} /> </Col></Row>
                <Row><Col md={10} mdOffset={1}><h2>Hi {this.state.user.name}</h2></Col></Row>
                
                <Row>
                <Col md={4}><Button onClick={()=>this.getAllMedia()}>All Photos</Button> </Col>
                <Col md ={4} > <Button onClick={() => this.getRecentMedia()}>Recent Photos</Button></Col>
                <Col md={4}>{(this.props.hashvals)?<Button onClick={()=>this.getMediaByHashtags()}>Photos with {this.props.hashvals.join()}</Button> 
                :  <HashTagModal/>}</Col>
                </Row>
                <Images/>

                {/* <Tabs defaultActiveKey={1} id="Imagdatatab">
                <Tab eventKey={1} title="Recent Photos">        </Tab>
                <Tab eventKey={2} title="All Photos">        </Tab>
                <Tab eventKey={3} title="Photos with hashtags">        </Tab>
                </Tabs> */}

                 </Grid>
                </Panel>
               
            </div>);
    }
}
export default Pictures;
