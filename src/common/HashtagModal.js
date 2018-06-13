import React, { Component } from 'react';
import { Container,Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { observer , inject } from "mobx-react";
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
              onKey
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

    this.toggle = this.toggle.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.sethashstr=this.sethashstr.bind(this);
    this.state = {
      show: false
    };
  }
  toggle() {
    this.setState({ show: !this.state.show });
  }
  sethashstr(){
    ;
    // this.props.store.sethashstr(this.hashstr);
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
      <Container>

        <Button >{/*onClick={this.toggle}*/}
          Photos with Hashtags
        </Button>

        <Modal isOpen={this.state.show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Please enter hashtag(s) to filter media </ModalHeader>
          <ModalBody>
          {/* <HastagInput sethashstr={this.sethashstr}/> */}
          <Input label="Enter hashtags" />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleOK}>OK</Button>
            <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}