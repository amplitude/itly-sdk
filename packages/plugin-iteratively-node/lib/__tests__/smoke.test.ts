/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const IterativelyNodePlugin = requireForTestEnv(__dirname);

const iterativelyApiKey = 'test-iteratively-api-key';

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk-node').default;
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const iterativelyPlugin = new IterativelyNodePlugin(
    iterativelyApiKey,
    {
      disabled: true,
      url: 'https://localhost:4000',
    },
  );

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [iterativelyPlugin],
    });
  }).not.toThrow();
});
