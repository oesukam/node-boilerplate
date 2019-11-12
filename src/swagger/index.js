import 'dotenv/config';

const { HOST, ADMIN_EMAIL } = process.env;
/* eslint-disable global-require */
export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Save',
    description: 'A Saving group platform',
    contact: {
      name: 'Save',
      email: ADMIN_EMAIL,
    },
  },
  host: HOST,
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['https', 'http'],
  paths: {
    ...require('./paths/auth'),
  },
  definitions: {
    ...require('./definitions/ErrorResponse'),
  },
};
