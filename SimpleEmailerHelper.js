

export default class SimpleEmailerHelper {

  static get emailFieldNames() {
    return _emailFieldNames;
  }

  static get fieldNames() {
    return _fieldNames;
  }

  static get emailRegex() {
    return _emailRegex;
  }

  static convertEmailBody(data) {
    let newBody = data['body'];
    if (newBody && newBody !== '') {
      newBody = newBody.replace(/<\/[^>]*>?/gm, '\n');
      newBody = newBody.replace(/<[^\>]*>?/gm, '');
    }
    data['body'] = newBody;
    return data;
  }

  static getEmptyFields(data) {
    let emptyFields = [];
    SimpleEmailerHelper.fieldNames.forEach(function(fieldName) {
      let fieldData = data[fieldName];
      if (fieldData === '' || !fieldData) {
        emptyFields.push(fieldName);
      }
    });
    return emptyFields;
  }

  static validateEmails(data) {
    let invalidEmails = [];
    SimpleEmailerHelper.emailFieldNames.forEach(function(fieldName) {
      let email = data[fieldName];
      if (!SimpleEmailerHelper.emailRegex.test(String(email).toLowerCase())) {
        invalidEmails.push(fieldName);
      }
    });
    return invalidEmails;
  }

  static base64Encode(string) {
    return Buffer.from(string).toString('base64');
  }

}

let _emailFieldNames = [
  'to',
  'from',
];

let _fieldNames = _emailFieldNames.concat([
  'to_name',
  'from_name',
  'subject',
  'body',
]);

let _emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
