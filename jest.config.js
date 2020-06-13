const base = require('./jest.config.base.js');

module.exports = {
  ...base,
  roots: [
    '<rootDir>/packages',
  ],
  projects: [
    '<rootDir>/packages/*/jest.config.js',
  ],
  coverageDirectory: '<rootDir>/coverage/',
};
