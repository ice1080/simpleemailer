import SimpleEmailerHelper from '../SimpleEmailerHelper';

describe('SimpleEmailerHelper', () => {

  test('getEmptyFields empty', () => {
    let data = {};
    expect(SimpleEmailerHelper.getEmptyFields(data)).toEqual([
      'to',
      'from',
      'to_name',
      'from_name',
      'subject',
      'body',
    ]);
  });

  test('getEmptyFields missing one', () => {
    let data = {
      to: 'toAddress1',
      to_name: 'to_name1',
      from: 'fromAddress1',
      subject: 'subject1',
      body: 'body1',
    };
    expect(SimpleEmailerHelper.getEmptyFields(data)).toEqual([
      'from_name'
    ]);
  });

  test('getEmptyFields happy', () => {
    let data = {
      to: 'toAddress2',
      to_name: 'to_name2',
      from: 'fromAddress2',
      from_name: 'from_name2',
      subject: 'subject2',
      body: 'body2',
    };
    expect(SimpleEmailerHelper.getEmptyFields(data)).toEqual([]);
  });

  test('convertEmailBody empty', () => {
    let data = {};
    expect(SimpleEmailerHelper.convertEmailBody(data)).toEqual({});
    data['body'] = '';
    expect(SimpleEmailerHelper.convertEmailBody(data)).toEqual({body: ''});
  });

  test('convertEmailBody text', () => {
    let data = {body: 'plain text'};
    expect(SimpleEmailerHelper.convertEmailBody(data)).toEqual({body: 'plain text'});
  });

  test('convertEmailBody html', () => {
    let data = {body: "<h1>Your Bill</h><p>$10</p>"};
    expect(SimpleEmailerHelper.convertEmailBody(data)).toEqual({body: 'Your Bill\n$10\n'});
  });

  test('validateEmails empty', () => {
    let data = {};
    expect(SimpleEmailerHelper.validateEmails(data)).toEqual(['to', 'from']);
  });

  test('validateEmails happy', () => {
    let data = {to: 'test@test.com', from: 'test2@test.com'};
    expect(SimpleEmailerHelper.validateEmails(data)).toEqual([]);
  });

  test('validateEmails sad', () => {
    let data = {to: 'badstuff', from: 'foobar'};
    expect(SimpleEmailerHelper.validateEmails(data)).toEqual(['to', 'from']);
  });

  test('validateEmails half happy', () => {
    let data = {to: 'stuff and things', from: 'testing@mrrobot.com'};
    expect(SimpleEmailerHelper.validateEmails(data)).toEqual(['to']);
  });
  
});

