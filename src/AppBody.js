import React, {Component} from 'react';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';

import logo from './img/pickcel.png';
import './App.css';


class AppBody extends Component {
  render() {
    return (
      <div className="App">
      <Grid>
        <Row>
          <Col md={4}><img src={logo} alt="logo"/></Col>
          <Col md={4}><h2>Instagram photo retriever</h2></Col>
          <Col md={4}>
          {(this.props.logout!==undefined)?<Button onClick={() =>this.props.logout()} 
          bsStyle="primary">Logout</Button> : <span>&nbsp;</span> }
          </Col>
        </Row>
        </Grid>
        
        <div>
          <Grid>
            <Row>
              <Col md={12}>
                {/* <Panel>
                  <Grid>
                    <Row>
                      <Col md={12}> */}
                        {this.props.children}
                      {/* </Col>
                    </Row>
                  </Grid>
                </Panel> */}
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default AppBody;
