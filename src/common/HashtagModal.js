import React, { Component } from 'react';
import { Input } from 'mdbreact';
import { observer , inject } from "mobx-react";

@inject("store")
@observer
export default class HashtagModal extends Component {
  constructor(props) {
    super(props);
    this.onsubmit=this.onsubmit.bind(this);
    this.onchange=this.onchange.bind(this);
    this.props.store.modal.onSubmit=this.onsubmit;
    this.value="";
  }
  onchange(e)
  {
    this.value=e.target.value;
  }
  onsubmit()
  {
    this.props.store.setHashStr(this.value)
    console.log(this.props.store.hashVals_concat)
    window.location.hash=this.props.store.hashVals_concat;
    this.props.store.modal.show = false;
  }

  render() {
      return ( <Input onChange={this.onchange} label="Enter Hastag(s)" size="sm" /> );
  }
}
