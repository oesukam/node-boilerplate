import { MOVED_PERMANENTLY } from '../constants/statusCodes';

const movedPermanently = () => (req, res) => res.status(MOVED_PERMANENTLY)
  .json({
    status: MOVED_PERMANENTLY,
    message: 'Moved Permantly',
  });

export default movedPermanently;
