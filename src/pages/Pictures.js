import React, { Component } from 'react';
import { Card, CardBody, CardImage, CardTitle, CardText, Row, Col, Container } from 'mdbreact';
import 'mobx';
import { observer , inject } from "mobx-react";
import AppBody from 'common/AppBody';

function Image(props) {
    var data = props.data;
    if (!data) return (<Col></Col>);
    return (
        <Col className="imgCol" lg="3" md="4" xs="6">
            <Card>
                <CardImage className="imgThumb img-thumbnail" onClick={() => window.open(data.link, '_blank')} src={data.img.standard_resolution.url} alt={data.alt} />
                <CardBody>
                    <CardTitle className="infotitlediv text-center">{data.alt}</CardTitle>
                    <CardText className="hashtagdiv text-center">{data.tags}</CardText>
                </CardBody>
            </Card>
        </Col>
    );
}
@inject("store")
@observer
class Pictures extends Component {
    render() {
        const {store} = this.props;
        const {user} = store;
        if (!store.user.isLoggedIn) 
            return (
                <AppBody>
                    <div>
                        <h3
                            style={{
                            color: 'red'
                        }}>You need to be logged in</h3>
                    </div>
                </AppBody>
            );
        
        var Images = () => (
            <Row>
                <Col>&nbsp;</Col>
            </Row>
        );
        if (user.isLoggedIn && user.data) {
            var Imglist = [];
            for (var i in user.data) {
                Imglist.push(<Image key={i} data={user.data[i]}/>);
            }
            if (Imglist && Imglist.length > 0) 
                Images = () => <Row className="text-center text-lg-left">{Imglist}</Row>;
            }
        return (
            <AppBody>
                <Container>
                    <Row className="text-center text-lg-left">
                        <Col md="12" className="text-center">
                            <Container>
                                {/* <Row className="text-center text-lg-left">
                                <Col md="4"><Button onClick={() => this.getAllMedia()}>All Photos</Button> </Col>
                                <Col md="4" > <Button onClick={() => this.getRecentMedia()}>Recent Photos</Button></Col>
                                <Col md="4">{(store.hashStr.trim()) ? <Button onClick={() => this.getMediaByHashtags()}>Photos with {store.hashStr}</Button>
                                    : <HashTagModal />}</Col>
                            </Row> */}
                                <Images/>
                            </Container>
                        </Col>

                    </Row>
                </Container>
            </AppBody>
        );
    }

    clearHashTags() {
        window.location.hash = '';
    }
}
export default Pictures;
