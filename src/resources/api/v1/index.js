import { Router } from 'express';
import movedPermanently from '../../../middlewares/movedPermanently';

const router = Router();

router.all('/*', movedPermanently);

export default router;
