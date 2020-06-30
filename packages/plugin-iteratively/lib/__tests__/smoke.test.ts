/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const IterativelyPlugin = requireForTestEnv(__dirname);

const iterativelyApiKey = 'test-iteratively-api-key';

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk-core').default;

  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const iterativelyPlugin = new IterativelyPlugin(
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
