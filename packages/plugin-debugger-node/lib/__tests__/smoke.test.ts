/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const DebuggerNodePlugin = requireForTestEnv(__dirname);

const debuggerApiKey = 'test-debugger-api-key';

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk-node').default;
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const debuggerPlugin = new DebuggerNodePlugin(
    debuggerApiKey,
    {
      disabled: true,
      url: 'https://localhost:4000',
    },
  );

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [debuggerPlugin],
    });
  }).not.toThrow();
});
