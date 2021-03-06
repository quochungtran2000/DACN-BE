import sgMail from '@sendgrid/mail';
import { createQueryBuilder } from 'typeorm';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import {
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_ADDRESS,
  USER_SECRET,
} from '../../../config/constant';
import { Partner } from '../entities';
import { PostCategory } from '../entities/post_category.entity';
import { PostTag } from '../entities/post_tag.entity';

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

export const generatorToken = async (user: Partner) => {
  let token = await jwt.sign(
    { userId: user.id, role: (user as any).role || 'user', ...user },
    USER_SECRET,
    {
      algorithm: 'HS256',
      subject: `${user.id}`,
      expiresIn: '1d',
    }
  );
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

export const beforeUpdatePost = (id: number): Promise<any> => {
  const postCategory = createQueryBuilder()
    .delete()
    .from(PostCategory)
    .where('post_id = :id', { id: id })
    .execute();

  const postTag = createQueryBuilder()
    .delete()
    .from(PostTag)
    .where('post_id = :id', { id: id })
    .execute();

  return Promise.all([postCategory, postTag]);
};
