import React, {Component} from 'react';
import {Row, Col, Container, Footer} from 'mdbreact';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

import NavBarMD from 'common/Nav';

// import DevTools from 'mobservable-react-devtools';

class AppFooter extends Component
{
  render()
  {
    return(
      <Footer color="indigo" className="font-small pt-0">
                <Container>
                    <Row>
                        <Col md="12">
                            <div className="mb-5 flex-center">
                            {(brands)?"":""}
                            <FontAwesomeIcon icon={['fab', 'facebook']} size='2x'/>
                            <FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                            <FontAwesomeIcon icon={['fab', 'twitter']} size='2x'/>
                            <FontAwesomeIcon icon={['fab', 'linkedin']} size='2x'/>
                            <FontAwesomeIcon icon={['fab', 'google-plus']} size='2x'/>
                            <FontAwesomeIcon icon={['fab', 'pinterest']} size='2x'/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-copyright text-center">
                    <Container fluid>
                        &copy; {(new Date().getFullYear())} Copyright: <a href="https://pickcel.com"> pickcel.com </a>
                    </Container>
                </div>
            </Footer>
    );
  }
}
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