import React, {Component} from 'react';
import {Row, Col, Container} from 'mdbreact';
import AppFooter from 'common/Footer';
import NavBarMD from 'common/Nav';

// import DevTools from 'mobservable-react-devtools';

class AppBody extends Component {
  render() {
    return (
      <span>
        <NavBarMD/>
        <Container className="container-fluid App">
          <Row>
            <Col md="12">
              {this.props.children}
            </Col>
          </Row>
        </Container>
        <AppFooter/>
      </span>
    );
  }
}
export default AppBody;