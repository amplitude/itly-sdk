/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { ItlyBrowser as Itly } from '@itly/sdk';
import MparticlePlugin from '../index';

let itly: Itly | undefined;

beforeEach(() => {
  jest.resetModules();

  itly = new Itly();
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const mparticlePlugin = new MparticlePlugin('API-KEY');

  expect(() => {
    itly!.load({
      environment: 'production',
      plugins: [mparticlePlugin],
    });
  }).not.toThrow();
});
