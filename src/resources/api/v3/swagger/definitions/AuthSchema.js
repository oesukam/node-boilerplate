module.exports = {
  LoginBody: {
    type: 'object',
    required: ['phone', 'password'],
    properties: {
      phone: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
};
