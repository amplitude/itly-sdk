import { ItlyBrowser as Itly } from '@itly/sdk';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const GoogleAnalyticsPlugin = requireForTestEnv(__dirname);

let itly: Itly;

beforeEach(() => {
  jest.resetModules();

  itly = new Itly();
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const googleAnalyticsPlugin = new GoogleAnalyticsPlugin({});

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [googleAnalyticsPlugin],
    });
  }).not.toThrow();
});
