import React, { Component } from 'react';
import { Card, CardBody, CardImage, CardTitle, CardText, Row, Col, Container } from 'mdbreact';
import 'mobx';
import { observer , inject } from "mobx-react";
import AppBody from 'common/AppBody';
import HashtagModal from 'common/HashtagModal';

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
        const {user}=this.props.store;
        this.props.store.getHashtagsMedia()
        var Contents = () => (
            <Row>
                <Col>&nbsp;</Col>
            </Row>
        );
        if (user.isLoggedIn) {
            if (user.error)
            {
                console.log("ERROR!")
                Contents = () => (
                    <Row>
                        <Col><Card><h2>Data not found!</h2><h3>Sorry for the incoveniecne</h3><h4>
                        {(user.error.meta && user.error.meta.error_message)?user.error.meta.error_message:""}</h4></Card></Col>
                    </Row>
                );
            }
            else if (user.data) {
                var Imglist = [];
                for (var i in user.data) {
                    Imglist.push(<Image key={i} data={user.data[i]} />);
                }
                if (Imglist && Imglist.length > 0)
                {
                    Imglist.push(<Card><h3>{this.props.store.hashStr}</h3></Card>);
                    Contents = () => <Row className="text-center text-lg-left">{Imglist}</Row>;
                }
            }
            else
                Contents = () => (
                <Row className="text-center text-lg-center">
                    <Col md="12">
                    <br/><br/><br/><br/>
                    <Card style={{display:'inline-block'}} className="align-middle"><h3>Loading..</h3><h5>Please wait</h5></Card>
                    </Col>
                </Row>);
        }
        else
            Contents = () => (
            <Row>
                <Col><Card><h2>You need to be logged in</h2><h4>If you have already done so, please wait until login details are received</h4></Card></Col>
            </Row>);
        return (
            <AppBody>
                <Container>
                    <Row className="text-center text-lg-center">
                        <Col md="12" className="text-center">
                            <Container>
                                <Contents/>
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
