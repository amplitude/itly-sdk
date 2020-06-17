module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/lib',
    // '<rootDir>/__tests__',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*.(test|spec)).(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules',
    '/dist',
  ],
  // testEnvironment: 'node',
  // setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '(__tests__/.*.mock).(jsx?|tsx?)$',
  ],
  verbose: true,
};
