import React, { Component } from 'react';

export default class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: '',
      toname: '',
      from: '',
      fromname: '',
      subject: '',
      body: '',
    };

    this.bindMethods.call(this);
  }

  bindMethods() {
    this.handleTextChange = this.handleTextChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleTextChange(event) {
    var updatedState = {};
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  submitForm() {
    let data = this.state; // I wouldn't normally do this, but since there's nothing else in state I'm using this for simplicity

    this.props.onSubmit(data);
  }
  
  render() {
    return (
      <div>
        Send an email via the configured provider
        <br/>
        <br/>
        To Email Address: <input type={'text'} name={'to'} value={this.state.to} onChange={this.handleTextChange} />
        <br/>
        <br/>
        To Name: <input type={'text'} name={'toname'} value={this.state.toname} onChange={this.handleTextChange} />
        <br/>
        <br/>
        From Email Address: <input type={'text'} name={'from'} value={this.state.from} onChange={this.handleTextChange} />
        <br/>
        <br/>
        From Name: <input type={'text'} name={'fromname'} value={this.state.fromname} onChange={this.handleTextChange} />
        <br/>
        <br/>
        Subject: <input type={'text'} name={'subject'} value={this.state.subject} onChange={this.handleTextChange} />
        <br/>
        <br/>
        Body: <textarea rows={'8'} columns={'100'} name={'body'} value={this.state.body} onChange={this.handleTextChange} />
        <br/>
        <br/>
        <button onClick={this.submitForm} >Send Email</button>
      </div>
    );
  }
}
