module.exports = {
  400: {
    description: 'Bad Request',
    schema: {
      $ref: '#/definitions/ValidationResponse',
    },
  },
  401: {
    description: 'Unauthorized access',
    example: {
      status: 401,
      message: 'Unauthorized Access',
    },
  },
  404: {
    description: 'Product does not exist',
    schema: {
      $ref: '#/definitions/ValidationResponse',
    },
  },
};
