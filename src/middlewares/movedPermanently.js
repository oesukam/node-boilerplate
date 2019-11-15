import { MOVED_PERMANENTLY } from '../constants/statusCodes';
import jsonResponse from '../helpers/jsonResponse';

const movedPermanently = (_, res) => jsonResponse({
  res,
  status: MOVED_PERMANENTLY,
  message: 'Moved Permantly',
});

export default movedPermanently;
