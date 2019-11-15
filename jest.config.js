module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/seeders',
    'src/server.js',
    'src/app.js',
    'src/helpers/logger.js',
    'src/models/index.js',
    'src/middlewares/joiErrors.js',
    'src/middlewares/asyncHandler.js',
    'src/config',
    'src/constants',
  ],
  verbose: true,
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
      statements: -40,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/__tests__/**/*.{js,ts}?(x)'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
};
