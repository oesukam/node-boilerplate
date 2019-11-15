
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger';

const router = Router();

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
