import MailgunSender from './MailgunSender';
import SendgridSender from './SendgridSender';

export default class EmailSenderFactory {
  static getEmailSender(senderName) {
    let emailSender;
    if (senderName === 'mailgun') {
      emailSender = new MailgunSender();
    } else if (senderName === 'sendgrid') {
      emailSender = new SendgridSender();
    }
    return emailSender;
  }
}


