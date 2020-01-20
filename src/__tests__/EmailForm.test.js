import React from 'react';
import {shallow, mount} from 'enzyme';
import EmailForm from '../EmailForm';

describe ('EmailForm', () => {
  let wrapper;
  let onSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<EmailForm onSubmit={onSubmit} />);
  });

  afterEach(() => {
    onSubmit.mockReset();
  });

  test('default state', () => {
    expect(wrapper.state()).toMatchSnapshot();
  });

  test('clearForm', () => {
    wrapper.setState({
      to: 'to1',
      to_name: 'to_name1',
      from: 'from1',
      from_name: 'from_name1',
      subject: 'subject1',
      body: 'body1',
    });
    wrapper.instance().clearForm();
    expect(wrapper.state()).toMatchSnapshot();
  });

  test('handleTextChange', () => {
    let event = {target: {
      name: 'to',
      value: 'newToValue',
    }};
    wrapper.instance().handleTextChange(event);
    expect(wrapper.state().to).toBe('newToValue');
  });

  test('submitForm', () => {
    wrapper.setState({
      to: 'to2',
      to_name: 'to_name2',
      from: 'from2',
      from_name: 'from_name2',
      subject: 'subject2',
      body: 'body2',      
    });

    expect(onSubmit).toHaveBeenCalledTimes(0);
    wrapper.instance().submitForm();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenLastCalledWith({
      to: 'to2',
      to_name: 'to_name2',
      from: 'from2',
      from_name: 'from_name2',
      subject: 'subject2',
      body: 'body2',
    });
  });
});
