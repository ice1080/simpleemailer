import React from 'react';
import {shallow, mount} from 'enzyme';
import ErrorDisplay from '../ErrorDisplay';

describe('ErrorDisplay', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorDisplay />);
  });

  test('default state', () => {
    expect(wrapper.state()).toMatchSnapshot();
  });

  test('updateErrors', () => {
    let emptyFields = ['a', 'b'];
    let invalidEmails = ['c', 'd'];

    wrapper.instance().updateErrors(emptyFields, invalidEmails);

    expect(wrapper.state()).toMatchSnapshot();
  });

  test('renderInvalidEmailErrors none', () => {
    expect(wrapper.text()).toBe('');
  });

  test('renderInvalidEmailErrors', () => {
    wrapper.setState({invalidEmails: ['error1', 'error2']});
    expect(wrapper.text()).toBe('The following fields contain invalid email addresses:error1error2');
  });

  test('renderEmptyFieldsErrors none', () => {
    expect(wrapper.text()).toBe('');
  });

  test('renderEmptyFieldsErrors', () => {
    wrapper.setState({emptyFields: ['errorA', 'errorB']});
    expect(wrapper.text()).toBe('The following fields are missing information:errorAerrorB');
  });
});
