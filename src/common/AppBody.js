import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NavBarMD from 'common/Nav';

class AppBody extends Component {
  render() {
    return (
      <div className="App">
      <NavBarMD />
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
