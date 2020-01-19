import SimpleEmailerHelper from '../SimpleEmailerHelper';

describe('SimpleEmailerHelper', () => {

  test('validateData empty', () => {
    let data = {};
    expect(SimpleEmailerHelper.validateData(data)).toEqual([
      'to',
      'toname',
      'from',
      'fromname',
      'subject',
      'body',
    ]);
  });

  test('validateData missing one', () => {
    let data = {
      to: 'toAddress1',
      toname: 'toName1',
      from: 'fromAddress1',
      subject: 'subject1',
      body: 'body1',
    };
    expect(SimpleEmailerHelper.validateData(data)).toEqual([
      'fromname'
    ]);
  });

  test('validateData happy', () => {
    let data = {
      to: 'toAddress2',
      toname: 'toName2',
      from: 'fromAddress2',
      fromname: 'fromName2',
      subject: 'subject2',
      body: 'body2',
    };
    expect(SimpleEmailerHelper.validateData(data)).toEqual([]);
  });
  
});

