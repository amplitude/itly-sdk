const base = require('../../jest.config.base.js');
const packageJson = require('./package.json');

module.exports = {
  ...base,
  testEnvironment: 'jsdom',
  name: packageJson.name,
  displayName: packageJson.name,
};
