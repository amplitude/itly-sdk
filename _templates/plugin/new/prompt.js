module.exports = [
  {
    type: 'input',
    name: 'author',
    message: 'Author?',
    initial: 'Iteratively',
  },
  {
    type: 'select',
    name: 'itlySdkModule',
    message: 'Itly SDK?',
    choices: [
      '@itly/sdk-core',
      '@itly/sdk',
      '@itly/sdk-node',
    ],
  },
  {
    type: 'input',
    name: 'itlySdkVersion',
    message: 'Itly SDK version?',
    initial: '^0.7.1',
  },
];
