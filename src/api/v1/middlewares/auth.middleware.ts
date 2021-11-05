import { USER_SECRET } from '../../../config/constant';

const jwt = require('jsonwebtoken');

const auth = async (req: any, res: any, next: any): Promise<any> => {
  try {
    req.user = undefined;
    let token = req.headers['authorization'] || req.query.token;
    token = token.split(' ')[1];
    if (!token) {
      console.log('not token');
      return next();
    }

    console.log('not token');
    const user = jwt.verify(token, USER_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    // return res.status(401).send({ code: 401, message: 'Unauthorized' });
    return next();
  }
};

export default auth;
