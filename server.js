const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

import SimpleEmailerHelper from './SimpleEmailerHelper';
import EmailSenderFactory from './EmailSenderFactory';
import { config } from './config';

let emailSender;
let senderConfig = 'mailgun';
if (config.app && config.app.emailSender) {
  senderConfig = config.app.emailSender;
}
emailSender = EmailSenderFactory.getEmailSender(senderConfig);

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/email', async function(req, res) {
  let data = req.body;
  data = SimpleEmailerHelper.convertEmailBody(data);
  let emptyFields = SimpleEmailerHelper.getEmptyFields(data);
  let invalidEmails = SimpleEmailerHelper.validateEmails(data);
  if (emptyFields.length > 0 || invalidEmails.length > 0) {
    res.status(400).send(JSON.stringify({'emptyFields': emptyFields, 'invalidEmails': invalidEmails}));
  } else {
    let sendStatus = await emailSender.sendEmail(data);
    res.sendStatus(sendStatus);
  }
});

app.listen(process.env.PORT || 8080, function() {
  console.log('simple emailer app is running');
});

