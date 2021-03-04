/**
 * Test NODE version of SDK
 * @jest-environment node
 */
/* eslint-disable import/no-unresolved, import/extensions, global-require */
/* eslint-disable no-unused-vars, no-console, class-methods-use-this */
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import requireForTestEnv from '../../../../__tests__/util/requireForTestEnv';
import TestingPlugin from '../../../plugin-testing/lib';

const plugins = [new CustomPlugin()];

export type TestParams = {
  name: string;
  context: any,
  options: any,
};

const testParams: TestParams[] = [
  {
    name: 'context = undefined',
    context: undefined,
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'context = 2 properties',
    context: {
      requiredString: 'A required string',
      optionalEnum: 'Value 1',
    },
    options: {
      environment: 'production',
      plugins,
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

    const Itly = requireForTestEnv(__dirname);
    itly = new Itly();

    spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
    itly = undefined;
  });

  test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
    async (name: string, { context, options }: TestParams) => {
      // Try tracking before load, should throw error
      try {
        await itly.identify(userId);
      } catch (e) {
        console.log(`Caught expected error. ${e.message}`);
      }

      // Load
      itly.load({ ...options, context });

      // Try load() again, should throw errror
      try {
        itly.load({ ...options, context });
      } catch (e) {
        console.log(`Caught expected error. ${e.message}`);
      }

      await itly.identify(undefined);
      await itly.identify(tempUserId);
      await itly.identify(tempUserId, {
        userProp: 'A user property value',
      });

      await itly.alias(userId);
      await itly.alias(userId, tempUserId);

      await itly.group(userId, groupId);

      await itly.page(userId, 'page category', 'page name', {
        pageProp: 'a page property',
      });

      await itly.track(userId, {
        name: 'Event No Properties',
      });

      await itly.track(userId, {
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
        await itly.track(userId, {
          name: 'EventMaxIntForTest',
          properties: {
            intMax10: 20,
          },
        });
      } catch (e) {
      // do nothing
      }

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

  test('should load and track events with properly merged context', async () => {
    const testingPlugin = new TestingPlugin();
    const context = {
      requiredString: 'A required string',
      optionalEnum: 'Value 1',
    };

    class TrackingEvent {
      name = 'Event With All Properties';

      // eslint-disable-next-line no-useless-constructor,no-empty-function
      constructor(public properties: any) {
      }
    }

    itly.load({
      context,
      environment: 'production',
      plugins: [testingPlugin],
    });

    await itly.identify(undefined, {
      userProp: 1,
    });

    await itly.alias(userId);

    await itly.group('a-group-id', {
      groupProp: 'test value',
    });

    await itly.page('page category', 'page name', {
      pageProp: 'a page property',
    });

    await itly.track(userId, {
      name: 'Event No Properties',
    });

    await itly.track(userId, new TrackingEvent({
      requiredNumber: 2.0,
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredBoolean: false,
      requiredConst: 'some-const-value',
      requiredArray: ['required', 'array'],
      optionalString: 'I\'m optional!',
    }));

    const trackingEvent = new TrackingEvent({
      requiredNumber: 2.0,
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredBoolean: false,
      requiredConst: 'some-const-value',
      requiredArray: ['required', 'array'],
      optionalString: 'I\'m optional!',
      ...context,
    });

    expect(testingPlugin.all()).toEqual([
      {
        name: 'Event No Properties',
        properties: { ...context },
      },
      trackingEvent,
    ]);
    expect(testingPlugin.firstOfType(TrackingEvent)).toEqual(trackingEvent);
  });
});
