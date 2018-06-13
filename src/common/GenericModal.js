import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { observer , inject } from "mobx-react";

@inject("store")
@observer
class GenericModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
    this.onOK=this.onOK.bind(this);
  }
  onsubmit(e)
  {
    // console.log("bt")
    // this.value="#al"
    // console.log(e)
  }
  onOK()
  {
   // console.log("onOK")
    // console.log(this.value)
    // if(this.value)
    //   this.props.store.setHashStr(this.value);
  }

  toggle() {
    this.props.store.modalShow = !this.props.store.modalShow;
  }

  render() {
    if (this.props.store.modalShow && this.props.store.modalTitle && this.props.store.modalChildren)
      return (
        <Container>        
          <Modal  isOpen={this.props.store.modalShow} toggle={this.toggle} centered size="sm">
            <ModalHeader toggle={this.toggle}>{this.props.store.modalTitle}</ModalHeader>
            <ModalBody>
            <form onSubmit={this.onsubmit}>
              <this.props.store.modalChildren/>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
              <Button onClick={this.onOK} color="primary">OK</Button>
            </ModalFooter>
          </Modal>
        </Container>
      );
    else
      {
        //console.log("modal error",this.props.store.modalShow , this.props.store.modalTitle , this.props.store.modalChildren);
        return (<Container>&nbsp;</Container>);
      }
  }
}
export default GenericModal;