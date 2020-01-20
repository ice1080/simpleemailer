const fetch = require('node-fetch');

import SimpleEmailerHelper from './SimpleEmailerHelper';

export default class SendgridSender {

  get apiKey() {
    return process.env.SENDGRID_API_KEY;
  }
  
  constructor() {
    console.log('creating a sendgrid sender instance');
  }

  async sendEmail(data) {
    let url = 'https://api.sendgrid.com/v3/mail/send';
    let authString = 'Bearer ' + this.apiKey;

    let sendingBody = {
      personalizations: [
        {
          to: [
            {
              email: data.to,
              name: data.to_name,
            },
          ],
        },
      ],
      from: {
        email: data.from,
        name: data.from_name,
      },
      subject: data.subject,
      content: [
        {
          type: "text/plain",
          value: data.body
        }
      ],
    };

    let response;
    try {
      response = await fetch(url, {
        headers: {
          'Authorization': authString,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(sendingBody),
      });
    } catch(error) {
      console.error('error sending email to sendgrid:', error);
    }
    return response.status;
  }
}
