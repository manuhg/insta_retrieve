import React, {Component} from 'react';
import {Row, Col, Container} from 'mdbreact';
import AppFooter from 'common/Footer';
import NavBarMD from 'common/Nav';
import GenericModal from 'common/GenericModal'

// import DevTools from 'mobservable-react-devtools';

class AppBody extends Component {
  render() {
    var height=Math.max(document.documentElement.clientHeight-300, window.innerHeight-300,460);

    return (
      <span>
        <NavBarMD/>
        <Container style={{minHeight:height+'px'}} className="container-fluid App">
          <Row>
            <Col md="12">
              {this.props.children}
            </Col>
          </Row>
          <Row><GenericModal/></Row>
        </Container>
        <AppFooter/>
      </span>
    );
  }
}
export default AppBody;