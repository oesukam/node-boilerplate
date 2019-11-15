import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UNAUTHORIZED } from '../constants/statusCodes';
import jsonResponse from '../helpers/jsonResponse';

const PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');


const checkAuth = async (req, res, next) => {
  let user;

  const { authorization = '' } = req.headers;
  const token = authorization.slice(3);
  if (!token) {
    return jsonResponse({
      res,
      status: UNAUTHORIZED,
      message: 'Unauthorized access',
    });
  }

  jwt.verify(token, PUBLIC_KEY, async (err, decoded) => {
    if (err || !decoded) {
      return res
        .status(UNAUTHORIZED)
        .json({
          status: UNAUTHORIZED,
          message: err.message
          || 'Unauthorized access',
        });
    }
    req.currentUser = user;
    req.token = token;
    next();
  });
};

export default checkAuth;
