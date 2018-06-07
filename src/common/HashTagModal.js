import React, { Component } from 'react';
import { Modal, Button, ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

import { getHashVal } from 'common/Auth';

class HastagInput extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.sethashstr=this.sethashstr.bind(this);
      this.hashstr='';
      this.state = {
        value: ''
      };
    }
    sethashstr()
    {
      this.props.sethashstr(this.hashstr);
    }  
    getValidationState() {
      this.hashvals = getHashVal(this.state.value);
      if(this.hashvals)
      {
          this.hashstr=this.hashvals.join();
          this.hvLength =0 ||this.hashvals.length;
      }
      //this.props.sethashstr(this.hashstr)
      if (this.hvLength > 1) return 'success';
      else return 'warning';
      //else  return 'error';
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  
    render() {
      return (
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}>
          
            <ControlLabel>Please Enter hashtags seperated by space or comma</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter hashtags"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>{this.hashstr}&nbsp;Number of hastags:&nbsp;{this.hvLength}</HelpBlock>
          </FormGroup>
        </form>
      );
    }
  }

  
class HashTagModal extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.sethashstr=this.sethashstr.bind(this);
    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }
  sethashstr(hashstr)
  {
    this.hashstr=hashstr;
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleOK()
  {
      this.setState({ show: false });
      if(this.hashstr)
        window.location.hash=this.hashstr;
  }
  render() {
    console.log("OKAY! "+this.state.show)
    return (
      <div>

        <Button bsStyle="default" onClick={this.handleShow}>
          Photos with Hashtags
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please enter hashtag(s) to filter media</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <HastagInput sethashstr={this.sethashstr}/>          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleOK}>OK</Button>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default HashTagModal;