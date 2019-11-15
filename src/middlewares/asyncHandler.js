import { SERVER_ERROR } from '../constants/statusCodes';

const asyncHandler = (cb) => async (req, res, next) => {
  try {
    await cb(req, res, next);
  } catch (err) {
    return res.status(SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: err.message || err.data.errorMessage,
    });
  }
};

export default asyncHandler;
