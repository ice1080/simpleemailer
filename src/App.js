import React, { Component } from 'react';
import EmailForm from './EmailForm';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Emailer App</h2>
        </div>
        <div>
          <EmailForm />
        </div>
      </div>
    );
  }
}
