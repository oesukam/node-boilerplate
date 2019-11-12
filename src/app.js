import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import swaggerUi from 'swagger-ui-express';
import joiErrors from './middlewares/joiErrors';
import movedPermanently from './middlewares/movedPermanently';
import swaggerDocument from './swagger';
import { NOT_FOUND } from './constants/statusCodes';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(methodOverride('_method'));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const apiPrefix = '/api/v3';

// Log requests to the console.
app.use(morgan(isProd ? 'combined' : 'dev'));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.all('/v1/*', movedPermanently());
app.all('/v2/*', movedPermanently());
app.use(`${apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(joiErrors());

app.get('/', (req, res) => res.json({
  status: 200,
  message: 'Welcome to our API',
}));

app.use((req, res) => {
  const status = NOT_FOUND;
  const message = 'Not Found';
  return res.status(NOT_FOUND)
    .json({
      status,
      message,
    });
});

export default app;
