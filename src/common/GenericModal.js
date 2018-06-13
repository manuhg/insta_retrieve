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
    this.props.store.modalShow = !this.props.store.modalShow;
  }

  render() {
    if (this.props.store.modalShow && this.props.store.modalTitle && this.props.store.modalChildren)
      return (
        <Container>        
          <Modal  isOpen={this.props.store.modalShow} toggle={this.toggle} centered size="sm">
            <ModalHeader toggle={this.toggle}>{this.props.store.modalTitle}</ModalHeader>
            <ModalBody>
              <this.props.store.modalChildren/>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
              <Button color="primary">OK</Button>
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

// import React from 'react';
// import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';


// class ModalPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false,
//       backdrop: false
//     };

//     this.toggle = this.toggle.bind(this);
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Button color="danger" onClick={this.toggle} >Modal</Button>
//         <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static">
//           <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
//           <ModalBody>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
//             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default ModalPage;