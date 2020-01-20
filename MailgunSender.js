const FormData = require('form-data');
const fetch = require('node-fetch');

import SimpleEmailerHelper from './SimpleEmailerHelper';

export default class MailgunSender {

  get apiKey() {
    return process.env.MAILGUN_API_KEY;
  }

  get domainName() {
    return process.env.MAILGUN_DOMAIN;
  }
  
  constructor() {
    console.log('creating a mailgun sender instance');
  }

  async sendEmail(data) {
    let url = 'https://api.mailgun.net/v3/' + this.domainName + '/messages';
    let authString = 'Basic ' + SimpleEmailerHelper.base64Encode('api:' + this.apiKey);

    let formdata = new FormData();
    formdata.append('from', data.from_name + ' <' + data.from + '>');
    formdata.append('to', data.to);
    formdata.append('subject', data.subject);
    formdata.append('text', data.body);

    let response;
    try {
      response = await fetch(url, {
        headers: {
          'Authorization': authString,
          'Accept': 'application/json',
        },
        method: 'POST',
        body: formdata
      });
    } catch (error) {
      console.error('error sending email to mailgun:', error);
    }
    return response.status;
  }
}
