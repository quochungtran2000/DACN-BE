import sgMail from '@sendgrid/mail';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import {
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_ADDRESS,
  USER_SECRET,
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

export const generatorToken = async (user: any) => {
  let token = await jwt.sign({ userId: user.id }, USER_SECRET, {
    algorithm: 'HS256',
    subject: `${user.id}`,
    expiresIn: '7d',
  });
  token = `Bearer ${token}`;
  return token;
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  hashedPassword: string,
  password2: string
) {
  return await bcrypt.compare(password2, hashedPassword);
}
