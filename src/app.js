import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

import joiErrors from './middlewares/joiErrors';
import { NOT_FOUND } from './constants/statusCodes';
import api from './resources/api';

const isProd = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(methodOverride('_method'));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Log requests to the console.
app.use(morgan(isProd ? 'combined' : 'dev'));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', api);

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
