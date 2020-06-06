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
    choices: ['@itly/sdk-node', '@itly/sdk'],
  },
  {
    type: 'input',
    name: 'itlySdkVersion',
    message: 'Itly SDK version?',
    initial: '^0.3.0',
  },
];
