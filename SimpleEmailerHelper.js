

export default class SimpleEmailerHelper {

  static get fieldNames() {
    return _fieldNames;
  }

  static validateData(data) {
    let emptyFields = [];
    SimpleEmailerHelper.fieldNames.forEach(function(fieldName) {
      let fieldData = data[fieldName];
      if (fieldData === '' || !fieldData) {
        emptyFields.push(fieldName);
      }
    });
    return emptyFields;
  }

}

let _fieldNames = [
  'to',
  'toname',
  'from',
  'fromname',
  'subject',
  'body',
];
