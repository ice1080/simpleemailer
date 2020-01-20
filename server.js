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

/**
 * Returns the homepage of the app.
 * 
 * @param req {Object} - Express framework request object.
 * @param res {Object} - Express framework response object.
 */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/**
 * Validates incoming body data and sends an email.
 * <p>
 * All fields on the body are required. If the 'body' field contains html, it will be stripped leaving only the text.
 * <p>
 * If the body data contains invalid emails or empty fields, the response sends a status of 400 and a json object with a list of both types of errors and the fields they occurred on.
 * <p>
 * If the body contains fully valid data, the response only sends a status of 200 without a body.
 * 
 * @param req {Object} - Express framework request object.
 * @param res {Object} - Express framework response object.
 * @param req.body {Object} - The JSON payload of the request.
 * @param req.body.to {String} - The email address to send the email to.
 * @param req.body.to_name {String} - The name of the person to which the email is being sent.
 * @param req.body.from {String} - The email address that the email is coming from.
 * @param req.body.from_name {String} - The name of the person from which the email is being sent.
 * @param req.body.subject {String} - The subject line of the email being sent.
 * @param req.body.body {String} - The content of the email being sent.
 */
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

