/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import Itly from '@itly/sdk';
import { requireForTestEnv } from '../../../../__tests__/util';

const MparticlePlugin = requireForTestEnv(__dirname);

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = new Itly();
});

afterEach(() => {
  itly = undefined;
});

test('should not crash on load', () => {
  const mparticlePlugin = new MparticlePlugin();

  expect(() => {
    itly.load({
      environment: 'production',
      plugins: [mparticlePlugin],
    });
  }).not.toThrow();
});
