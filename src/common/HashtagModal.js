import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter,Input } from 'mdbreact';
import { observer , inject } from "mobx-react";

@inject("store")
@observer
class HashtagModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onsubmit=this.onsubmit.bind(this);
    this.onchange=this.onchange.bind(this);
    this.onOK=this.onOK.bind(this);
  }
  onchange(e)
  {
    console.log("chg")
    console.log(e)
  }
  onsubmit(e)
  {
    this.onOK(e);
  }
  onOK(e)
  {
    console.log("onOK")
    console.log(e)
    // console.log(this.value)
    // if(this.value)
    //   this.props.store.setHashStr(this.value);
  }

  toggle() {
    this.props.store.hmodalShow = !this.props.store.hmodalShow;
  }

  render() {
    if (this.props.store.hmodalShow)
      return (
        <Container>
          <Modal isOpen={this.props.store.hmodalShow} toggle={this.toggle} centered size="sm">
            <ModalHeader toggle={this.toggle}>Enter Hashtag(s)</ModalHeader>
            <ModalBody>
              <form onSubmit={this.onsubmit}>
                <Input onChange={this.onchange(this.value)} label="Enter Hastag(s)" size="sm" />
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
export default HashtagModal;