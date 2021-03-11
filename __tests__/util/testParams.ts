/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  Options,
  Event,
  Properties,
  Plugin,
  ValidationResponse,
} from '../../packages/sdk';

export type TestParams = {
  name: string;
  context?: Properties,
  options: Options,
};
