/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';
import { CLEAN_UP_PROCESS_EVENT } from '../index';

const IterativelyNodePlugin = requireForTestEnv(__dirname);

const iterativelyApiKey = 'test-iteratively-api-key';

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk').default;
});

afterEach(() => {
  itly = undefined;

  // NOTE: Since tests don't call process.exit() like a normal node process
  // NOTE: we emit a 'cleanup' event to shutdown the plugin instead
  // @ts-ignore
  process.emit(CLEAN_UP_PROCESS_EVENT);
});

test('should not crash on load', () => {
  const iterativelyPlugin = new IterativelyNodePlugin(
    iterativelyApiKey,
    {
      disabled: false,
      url: 'https://localhost:4000/t/version',
    },
  );

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [iterativelyPlugin],
    });
  }).not.toThrow();
});
