import { isCelebrate } from 'celebrate';
import { BAD_REQUEST } from '../constants/statusCodes';

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrate(err)) return next(err);
  return res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    message: 'Bad Request',
    errors: err.joi.details || undefined,
  });
};

export default joiErrors;
