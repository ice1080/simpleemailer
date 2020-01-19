import React, { Component } from 'react';

export default class EmailForm extends Component {
  render() {
    return (
      <form action={'/email'} method={'post'}>
        Send an email via the configured provider
        <br/>
        <br/>
        To Email Address: <input type={'text'} name={'to'} />
        <br/>
        <br/>
        To Name: <input type={'text'} name={'toname'} />
        <br/>
        <br/>
        From Email Address: <input type={'text'} name={'from'} />
        <br/>
        <br/>
        From Name: <input type={'text'} name={'fromname'} />
        <br/>
        <br/>
        Subject: <input type={'text'} name={'subject'} />
        <br/>
        <br/>
        Body: <textarea rows={'8'} columns={'100'} name={'body'} />
        <br/>
        <br/>
        <input type={'submit'} value={'Send Email'} />
      </form>
    );
  }
}
