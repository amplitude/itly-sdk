/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  Plugin,
} from '../../packages/sdk/lib';

export default class DummyPlugin extends Plugin {
  constructor() {
    super('dummy');
  }
}
