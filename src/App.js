import React, { Component } from 'react';
import EmailForm from './EmailForm';
import ErrorDisplay from './ErrorDisplay';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.errorsRef = React.createRef();

    this.bindMethods.call(this);
  }

  bindMethods() {
    this.sendEmail = this.sendEmail.bind(this);
  }

  sendEmail(data) {
    fetch('/email', {
      credentials: 'same-origin',
      method: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        // todo move this into the first .then block to be able to check status as well
        console.log(responseData);
        // todo check response status instead of length of emptyFields
        if (responseData.emptyFields.length > 0 || responseData.invalidEmails.length > 0) {
          this.errorsRef.current.updateErrors(responseData.emptyFields, responseData.invalidEmails);
        } else {
          console.log('no errors and such');
        }
      })
      .catch(error => console.error('bad luck', error));
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Emailer App</h2>
        </div>
        <div>
          <ErrorDisplay ref={this.errorsRef} />
        </div>
        <div>
          <EmailForm onSubmit={this.sendEmail} />
        </div>
      </div>
    );
  }
}
