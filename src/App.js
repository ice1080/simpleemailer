import React, { Component } from 'react';
import EmailForm from './EmailForm';
import './App.css';

export default class App extends Component {

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
        // todo check response instead of length of emptyFields
        if (responseData.emptyFields.length > 0) {
          console.log('there were errors', responseData.emptyFields);
        } else {
          console.log('no errors and such');
        }
      })
      .catch(error => console.error(error));
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Emailer App</h2>
        </div>
        <div>
          <EmailForm onSubmit={this.sendEmail} />
        </div>
      </div>
    );
  }
}
