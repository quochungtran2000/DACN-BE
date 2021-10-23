import sgMail from '@sendgrid/mail';
import {
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_ADDRESS,
} from '../../../config/constant';

export const sendEmail = async (
  email: string,
  subject: string,
  content: any
) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: SENDGRID_EMAIL_ADDRESS, // Use the email address or domain you verified above
    subject: subject,
    text: 'text',
    html: content,
  };

  await sgMail.send(msg);

  try {
  } catch (error) {
    console.log(`SendMail Error:`, error);
  }
};
