import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Row, Col, Container } from 'mdbreact';

import { observer , inject } from "mobx-react";

import HashTagModal from 'common/HashTagModal';
import { asyncrequest } from 'common/Auth';

function Image(props) {
    var data = props.data;
    if (!data) return (<Col></Col>);
    return (
        <Col className="imgCol" lg="3" md="4" xs="6">
            <Card>
            <CardImage className="imgThumb img-thumbnail"  onClick={()=>window.open(data.link,'_blank')} src={data.img.standard_resolution.url} alt={data.alt} />
            <CardBody>
            <CardTitle className="infotitlediv text-center">{data.alt}</CardTitle>
            <CardText  className="hashtagdiv text-center">{data.tags}</CardText>
            </CardBody>
            </Card>
        </Col>
    );
}

@inject("store")
@observer
class Pictures extends Component {
    constructor() {
        super();
        this.state = {data: null};
        this.HashtagsSpecified = false;
    }
    render() {
        const {store} = this.props;
        if (!store.user.isLoggedIn)
            return (
                <div>
                    <h3 style={{
                        color: 'red'
                    }}>You need to be logged in</h3>
                </div>
            );

        var Images = () => (
            <Row>
                <Col>&nbsp;</Col>
            </Row>
        );
        if (this.state.data) {
            var Imglist = [];
            for (var i in this.state.data) {
                Imglist.push(<Image key={i} data={this.state.data[i]} />);
            }
            if (Imglist && Imglist.length > 0)
                Images = () => <Row className="text-center text-lg-left">{Imglist}</Row>;
        }
        return (
            <Container>
                <Row className="text-center text-lg-left">
                    <Col md="12" className="text-center">
                    <Container>
                            <Row className="text-center text-lg-left">
                                <Col md="4"><Button onClick={() => this.getAllMedia()}>All Photos</Button> </Col>
                                <Col md="4" > <Button onClick={() => this.getRecentMedia()}>Recent Photos</Button></Col>
                                <Col md="4">{(store.hashStr) ? <Button onClick={() => this.getMediaByHashtags()}>Photos with {store.hashStr}</Button>
                                    : <HashTagModal />}</Col>
                            </Row>
                            <Images />
                            </Container>
                    </Col>

                </Row>
            </Container>
        );
    }
    getRecentMedia() {
        asyncrequest('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + this.props.store.user.acTokenVal, this.fetchRecentMedia.bind(this))
    }
    getMediaByHashtag(hashtag) {
        asyncrequest('https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?access_token=' + this.props.store.user.acTokenVal, this.fetchMediaData.bind(this));
    }
    getAllMedia() {
        asyncrequest('https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + this.props.store.user.acTokenVal, this.fetchMediaData.bind(this))
    }

    fetchMediaData(data) {
        if (data)
            this.setState({data: data});
    }
    fetchRecentMedia(data) {

        if (data) {
            var imgdata = {};
            for (var i = 0; i < data.data.length; i++) {
                var alt = (data.data[i].caption)
                    ? data.data[i].caption.text
                    : " ";
                imgdata[i] = {
                    img: data.data[i].images,
                    alt: alt,
                    link: data.data[i].link,
                    tags: data.data[i].tags
                };
            }
            this.setState({data: imgdata});
        }
    }
    getMediaByHashtags() {
       // if (!this.HashtagsSpecified)
           // ;//modal
        //for

    }
    clearHashTags() {
        window.location.hash = '';
    }
}
export default Pictures;
