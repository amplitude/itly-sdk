/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  PluginBase,
} from '../../packages/sdk/lib';

export default class DummyPlugin extends PluginBase {
  id = () => 'dummy';
}
