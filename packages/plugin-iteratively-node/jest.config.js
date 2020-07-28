// Jest configuration for api
const base = require('../../jest.config.base.js');
const packageJson = require('./package.json');

module.exports = {
  ...base,
  testEnvironment: 'node',
  name: packageJson.name,
  displayName: packageJson.name,
};
