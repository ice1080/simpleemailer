import React, { Component } from 'react';

export default class ErrorDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invalidEmails: [],
      emptyFields: [],
    };
  }

  updateErrors(emptyFields, invalidEmails) {
    this.setState({emptyFields: emptyFields, invalidEmails: invalidEmails});
  }

  renderInvalidEmailErrors() {
    if (this.state.invalidEmails.length > 0) {
      let i = 0;
      return (
        <React.Fragment>
          The following fields contain invalid email addresses:
          <ul>{
              this.state.invalidEmails.map(invalidEmailField => {
                i++;
                return (<li key={i} >{invalidEmailField}</li>);
              })
          }</ul>
          </React.Fragment>
      );
    } else {
      return '';
    }
  }

  renderEmptyFieldsErrors() {
    if (this.state.emptyFields.length > 0) {
      let i = 0;
      return (
        <React.Fragment>
          The following fields are missing information:
          <ul>{
              this.state.emptyFields.map(emptyField => {
                i++;
                return (<li key={i} >{emptyField}</li>);
              })
          }</ul>
        </React.Fragment>
      );
    } else {
      return '';
    }
  }

  render() {
    return(
      <React.Fragment>
        <div style={{color: 'red'}} >
          {this.renderInvalidEmailErrors()}
          {this.renderEmptyFieldsErrors()}
        </div>
        <br/>
      </React.Fragment>
    );
  }
}
