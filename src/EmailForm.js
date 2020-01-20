import React, { Component } from 'react';

export default class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: '',
      to_name: '',
      from: '',
      from_name: '',
      subject: '',
      body: '',
    };

    this.bindMethods.call(this);
  }

  bindMethods() {
    this.handleTextChange = this.handleTextChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  clearForm() {
    this.setState({to: '', to_name: '', from: '', from_name: '', subject: '', body: ''});
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
        Send an email via the configured provider.
        All Fields Required!
        <br/>
        <br/>
        To Email Address: <input type={'text'} name={'to'} value={this.state.to} onChange={this.handleTextChange} />
        <br/>
        <br/>
        To Name: <input type={'text'} name={'to_name'} value={this.state.to_name} onChange={this.handleTextChange} />
        <br/>
        <br/>
        From Email Address: <input type={'text'} name={'from'} value={this.state.from} onChange={this.handleTextChange} />
        <br/>
        <br/>
        From Name: <input type={'text'} name={'from_name'} value={this.state.from_name} onChange={this.handleTextChange} />
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
