/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  Options,
  Event,
  Properties,
  PluginBase,
  ValidationResponse,
} from '../../packages/sdk/lib';

export type TestParams = {
  name: string;
  context?: Properties,
  options: Options,
};
