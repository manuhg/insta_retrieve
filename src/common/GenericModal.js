import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { observer , inject } from "mobx-react";

@inject("store")
@observer
class GenericModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.store.modal.show = !this.props.store.modal.show;
  }

  render() {
    const {modal}=this.props.store;
    console.log(modal)
    if (modal && modal.show && modal.title && modal.onSubmit && modal.children)
      return (
        <Container>
          <Modal  isOpen={modal.show} toggle={this.toggle} centered size="sm">
            <ModalHeader toggle={this.toggle}>{modal.title}</ModalHeader>
            <ModalBody>
            {/* <form onSubmit={modal.onSubmit}> */}
              <modal.children/>
              {/* </form> */}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
              <Button onClick={modal.onSubmit} color="primary">OK</Button>
            </ModalFooter>
          </Modal>
        </Container>
      );
    else
      {
        return (<Container>&nbsp;</Container>);
      }
  }
}
export default GenericModal;