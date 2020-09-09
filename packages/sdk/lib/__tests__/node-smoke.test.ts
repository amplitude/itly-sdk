/**
 * Test NODE version of SDK
 * @jest-environment node
 */
/* eslint-disable import/no-unresolved, import/extensions, global-require */
/* eslint-disable no-unused-vars, no-console, class-methods-use-this */
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import requireForTestEnv from '../../../../__tests__/util/requireForTestEnv';

const plugins = [new CustomPlugin()];

export type TestParams = {
  name: string;
  options: any,
};

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

let itly: any;
const userId = 'test-user-id';
const tempUserId = 'temp-user-id';
const groupId = 'test-group-id';
let spyConsoleLog: jest.SpyInstance;

describe('should load and track events to a custom destination (no validation)', () => {
  beforeEach(() => {
    jest.resetModules();

    itly = requireForTestEnv(__dirname);

    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
    itly = undefined;
  });

  test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
    async (name: string, { options }: TestParams) => {
      // Try tracking before load, should throw error
      try {
        itly.identify(userId);
      } catch (e) {
        console.log(`Caught expected error. ${e.message}`);
      }

      // Load
      itly.load(options);

      // Try load() again, should throw errror
      try {
        itly.load(options);
      } catch (e) {
        console.log(`Caught expected error. ${e.message}`);
      }

      itly.identify(undefined);
      itly.identify(tempUserId);
      itly.identify(tempUserId, {
        userProp: 'A user property value',
      });

      itly.alias(userId);
      itly.alias(userId, tempUserId);

      itly.group(userId, groupId);

      itly.page(userId, 'page category', 'page name', {
        pageProp: 'a page property',
      });

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
    });

  test('should call Plugin.load() if itly is NOT disabled', () => {
    const plugin = new CustomPlugin();
    const spyPluginLoad = jest.spyOn(plugin, 'load');

    itly.load({
      plugins: [plugin],
      disabled: false,
    });

    expect(spyPluginLoad).toHaveBeenCalled();
  });

  test('should NOT call Plugin.load() if itly is disabled', () => {
    const plugin = new CustomPlugin();
    const spyPluginLoad = jest.spyOn(plugin, 'load');

    itly.load({
      plugins: [plugin],
      disabled: true,
    });

    expect(spyPluginLoad).not.toHaveBeenCalled();
  });
});
