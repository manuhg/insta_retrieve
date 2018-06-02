import React, {Component,Children} from 'react';
import { Panel, Grid, Row, Col, Button, Badge } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';

import logo from './img/pickcel.png';
import './App.css';


class AppBody extends Component {
  render() {

    return (
      <div className="App">
        <img src={logo} alt="logo"/>
        <h1>
          Instagram photo retriever
        </h1>

        <div>
          <Grid>
            <Row>
              <Col md={12}>
                <Panel>
                  <Grid>
                    <Row>
                      <Col md={12}>
                        {this.props.children}
                      </Col>
                    </Row>
                  </Grid>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default AppBody;
