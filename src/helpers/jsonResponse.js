/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = (data) => data.res
  .status(data.status).json({
    ...data,
    res: undefined,
  });

export default jsonResponse;
