import React, { Component } from 'react';
import EmailForm from './EmailForm';
import ErrorDisplay from './ErrorDisplay';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.errorsRef = React.createRef();
    this.emailFormRef = React.createRef();

    this.bindMethods.call(this);
  }

  bindMethods() {
    this.sendEmail = this.sendEmail.bind(this);
  }

  async sendEmail(data) {
    try {
      let response = await fetch('/email', {
        credentials: 'same-origin',
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
      if (response.status <= 299) {
        this.emailFormRef.current.clearForm();
        // I would have preferred to include a success message here.
      } else {
        // I would have cleaned this up a bit more if I had more time. A non-200 response could indicate more than just empty fields and invalid emails.
        let responseData = await response.json();
        this.errorsRef.current.updateErrors(responseData.emptyFields, responseData.invalidEmails);
      }
    } catch (error) {
      console.error('error sending email:', error);
    }
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
          <EmailForm ref={this.emailFormRef} onSubmit={this.sendEmail} />
        </div>
      </div>
    );
  }
}
