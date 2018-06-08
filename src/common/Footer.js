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
    if(!solids||!brands)
        console.log("FA icons not found");
     // navbar-fixed-bottom
    return(
      <Footer color="black" className="footer"><br/>
                <Container className="text-center">
                <Row>
                <Col md="12">
                <a href="http://pickcel.com"><img src={logo} alt="pickcel.com" /></a>
                </Col>
                </Row>
                    <Row>
                    <Col md="12"><br/>
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
                    <Container fluid><br/>
                       <h4> &copy; {(new Date().getFullYear())} Copyright:  LaneSquare Technology Pvt. Ltd. | All Rights Reserved</h4><br/>
                    </Container>
                </div>
            </Footer>
    );
  }
}
export default AppFooter;