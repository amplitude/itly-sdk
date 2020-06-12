/* eslint-disable import/no-unresolved, no-unused-vars, global-require, import/extensions */
import { ItlyOptions, ItlyPlugin } from '../../packages/sdk-core/lib';
import CustomPlugin from '../../test/src/CustomPlugin';

type TestParams = {
  name: string;
  options: ItlyOptions,
};

const userId = 'test-user-id';
const groupId = 'test-group-id';
let spyConsoleLog: jest.SpyInstance;

const plugins = [new CustomPlugin()];

const testParams: TestParams[] = [
  {
    name: 'context = undefined',
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'context = 2 properties',
    options: {
      environment: 'production',
      plugins,
      context: {
        requiredString: 'A required string',
        optionalEnum: 'Value 1',
      },
    },
  },
];

describe('should load and track events to a custom destination (no validation)', () => {
  beforeEach(() => {
    jest.resetModules();
    spyConsoleLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
    async (name: string, { options }: TestParams) => {
      const { default: itly } = require('../../packages/sdk-core/lib');
      // Try tracking before load, should throw errror
      try {
        itly.identify(userId);
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(`Caught expected error. ${e.message}`);
      }

      itly.load(options);

      itly.identify(undefined);
      itly.alias(userId);
      itly.group(userId, groupId);

      itly.track(userId, {
        name: 'Event No Properties',
      });

      itly.track(userId, {
        name: 'Event With All Properties',
        properties: {
          requiredString: 'A required string',
          requiredNumber: 2.0,
          requiredInteger: 42,
          requiredEnum: 'Enum1',
          requiredBoolean: false,
          requiredConst: 'some-const-value',
          requiredArray: ['required', 'array'],
          optionalString: 'I\'m optional!',
        },
      });

      try {
        itly.track(userId, {
          name: 'EventMaxIntForTest',
          properties: {
            intMax10: 20,
          },
        });
      } catch (e) {
      // do nothing
      }

      const customOnly = itly.getPlugin('custom');
      // eslint-disable-next-line no-console
      console.log('CustomPlugin.id()', customOnly!.id());

      expect(spyConsoleLog.mock.calls).toMatchSnapshot();

      spyConsoleLog.mockRestore();
    });
});
