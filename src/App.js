import React, {Component} from 'react';
import logo from './img/pickcel.png';
import './App.css';
import Pictures from './Pictures';
import {Panel, Grid, Row, Col, Button, Badge} from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import verge from 'verge';
class App extends Component {
  constructor()
  {
    super();
    this.state = {
      accessToken: null
    };
  }
  render() {
    if (!this.state.accessToken) 
      return (
        <div className="App">

          <img src={logo} alt="logo"/>
          <h1> Instagram photo retriever <Badge>1</Badge> </h1>

          <div>
            <Grid>
              <Row>
                <Col md={12}>
                  <Panel>
                    <Panel.Body>
                        <Row>
                          <Col md={12}>
                            <a
                              href="https://api.instagram.com/oauth/authorize/?client_id=73b2e998521244e2b98b255943b42e87&redirect_uri=http://manuhegde.in&response_type=token">
                              
                              <Button bsStyle="primary"><FontAwesomeIcon icon={['fab', 'instagram']} size='2x'/>
                                <font size="5">&nbsp;&nbsp;&nbsp;Login with Instagram</font>
                              </Button>
                              
                            </a>
                          </Col>
                        </Row>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      );
    }
  }

export default App;
