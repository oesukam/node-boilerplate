const responses = require('../constants/responses');

module.exports = {
  '/auth': {
    post: {
      tags: ['auth'],
      summary: 'Login',
      schema: {
        $ref: '#/definitions/LoginBody',
      },
      responses,
    },
  },
};
