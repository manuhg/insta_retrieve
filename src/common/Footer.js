import React, {Component} from 'react';
import {Row, Col, Container, Footer} from 'mdbreact';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import solids from '@fortawesome/fontawesome-free-solid';

import logo from 'resources/pickcel.png';
class AppFooter extends Component
{
  render()
  {
    return(
      <Footer color="black">
                <Container className="text-left">
                    <Row> {(solids)?"":""}
                    <Col md="4">
                    <FontAwesomeIcon  icon={['fas', 'phone']} size='4x' />
                    &nbsp;<h2>Call Us</h2>
                    </Col>
                    <Col md="4">
                    </Col>
                    <Col md="4">
                        <a href="http://pickcel.com"><img src={logo} alt="pickcel.com" /></a>
                        <div className="mb-10 flex-center">
                            {(brands)?"":""}
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'facebook']} size='3x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'instagram']} size='3x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'twitter']} size='3x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'linkedin']} size='3x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'google-plus']} size='3x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'pinterest']} size='3x'/>
                            </div>
                    </Col>
                    </Row>
                </Container>
                
                <div className="footer-copyright text-center">
                    <Container fluid>
                       <h4> &copy; {(new Date().getFullYear())} Copyright:  LaneSquare Technology Pvt. Ltd. | All Rights Reserved</h4>
                    </Container>
                </div>
            </Footer>
    );
  }
}
export default AppFooter;