/* eslint-disable import/no-unresolved */
import Itly from '../node';
import { Plugin } from '../base';

export const createPlugin = jest.fn((id?: string) => ({
  id: id ?? 'mock-plugin',
  validate: () => ({ valid: true }),
  load: jest.fn(),
  alias: jest.fn(),
  identify: jest.fn(),
  postIdentify: jest.fn(),
  group: jest.fn(),
  postGroup: jest.fn(),
  page: jest.fn(),
  postPage: jest.fn(),
  track: jest.fn(),
  postTrack: jest.fn(),
  reset: jest.fn(),
  flush: jest.fn(),
// eslint-disable-next-line no-unused-vars
})) as unknown as ((id?: string) => Plugin);

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function callItlyMethod(itly: Itly, methodName: string, args: any[] = []): jest.Mock {
  return (itly as any)[methodName](...args);
}

export function getPluginMethods(plugin: Plugin, methodName: string): [jest.Mock, jest.Mock] {
  return [(plugin as any)[methodName], (plugin as any)[`post${capitalize(methodName)}`]];
}

export function hasPostMethod(methodName: string) {
  return ['identify', 'group', 'page', 'track'].some((name) => methodName === name);
}
