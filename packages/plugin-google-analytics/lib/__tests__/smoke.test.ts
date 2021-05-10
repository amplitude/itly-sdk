import { ItlyBrowser as Itly } from '@itly/sdk';

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import GoogleAnalyticsPlugin from '../index';

let itly: Itly;

beforeEach(() => {
  jest.resetModules();

  itly = new Itly();
});

test('should not crash on load', () => {
  const googleAnalyticsPlugin = new GoogleAnalyticsPlugin({ measurementId: 'G-CC5SQPL3J6' });

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [googleAnalyticsPlugin],
    });
  }).not.toThrow();
});

test('loads global gtag', async () => {
  const gaFn = jest.fn();
  // eslint-disable-next-line no-restricted-globals
  (self as any).gtag = gaFn;
  const googleAnalyticsPlugin = new GoogleAnalyticsPlugin({ measurementId: 'G-CC5SQPL3J6' });

  itly.load({
    environment: 'production',
    plugins: [googleAnalyticsPlugin],
  });
  itly.identify({ userId: 'user-1234' });
  itly.track({ name: 'Test', properties: { number: 1, string: 'Hello' } });

  expect(gaFn).toHaveBeenCalledTimes(2);
});

test('uses explicitly passed gtag', async () => {
  const gtag = jest.fn();
  const googleAnalyticsPlugin = new GoogleAnalyticsPlugin({ measurementId: 'G-CC5SQPL3J6', gtag });

  itly.load({
    environment: 'production',
    plugins: [googleAnalyticsPlugin],
  });
  itly.identify({ userId: 'user-1234' });
  itly.track({ name: 'Test', properties: { number: 1, string: 'Hello' } });

  expect(gtag).toHaveBeenCalledTimes(2);
});

test('creates a global gtag', async () => {
  const googleAnalyticsPlugin = new GoogleAnalyticsPlugin({ measurementId: 'G-CC5SQPL3J6' });

  itly.load({
    environment: 'production',
    plugins: [googleAnalyticsPlugin],
  });

  // eslint-disable-next-line no-underscore-dangle
  expect((googleAnalyticsPlugin as any)._gtag).toBeDefined();
  // eslint-disable-next-line no-underscore-dangle
  (googleAnalyticsPlugin as any)._gtag = jest.fn(googleAnalyticsPlugin.gtag);
  // eslint-disable-next-line no-restricted-globals
  expect((self as any).gtag).toBeDefined();

  itly.identify({ userId: 'user-1234' });
  itly.track({ name: 'Test', properties: { number: 1, string: 'Hello' } });

  expect(googleAnalyticsPlugin.gtag).toHaveBeenCalledTimes(2);
});
