/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import { ItlyBrowser as Itly } from '@itly/sdk';
import {
  TestParams,
  requireForTestEnv,
} from '../../../../__tests__/util';

const AmplitudePlugin = requireForTestEnv(__dirname);

const userId = 'test-user-id';
const groupId = 'test-group-id';

let spyConsoleLog: jest.SpyInstance;

const testParams: TestParams[] = [
  {
    name: 'load, identify, alias, group, track, reset',
    options: {
      environment: 'production',
      plugins: [],
    },
  },
];

beforeEach(() => {
  jest.resetModules();
  spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);
});

afterEach(() => {
  spyConsoleLog.mockRestore();
});

const methodArgLoggerMock = (methodName: string, ...args: any[]) => {
  // eslint-disable-next-line no-console
  console.log(`${methodName}()`, JSON.stringify(args.map((arg) => (typeof arg === 'function' ? '<FUNC>' : arg))));
};

test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
  async (name: string, { context, options }: TestParams) => {
    const itly = new Itly();

    const instanceMocks: { [key: string]: any } = {};
    ['init', 'identify', 'track', 'setUserId', 'regenerateDeviceId', 'logEvent'].forEach((mockMethod) => {
      instanceMocks[mockMethod] = jest.fn().mockImplementation(
        (...args) => methodArgLoggerMock(`amplitude.getInstance().${mockMethod}`, ...args),
      );
    });

    const identifyMocks: { [key: string]: any } = {};
    ['set'].forEach((mockMethod) => {
      identifyMocks[mockMethod] = jest.fn().mockImplementation(
        (...args) => methodArgLoggerMock(`amplitude.Identify.${mockMethod}`, ...args),
      );
    });

    const plugin = new AmplitudePlugin('an-amplitude-api-key');

    // Mock amplitude getter
    Object.defineProperty(plugin, 'amplitude', {
      get: jest.fn(() => ({
        Identify: () => identifyMocks,
        getInstance: () => instanceMocks,
      })),
    });

    // Try tracking before load, should throw errror
    try {
      itly.identify(userId);
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(`Caught expected error. ${e.message}`);
    }

    itly.load({
      ...options,
      context,
      plugins: [plugin].concat(options.plugins),
    });

    itly.identify(undefined);
    itly.identify('temp-user-id');
    itly.identify(undefined, {
      userProp: 'A user property value',
    });
    itly.alias(userId, 'temp-user-id');
    itly.group(groupId);

    itly.track({
      name: 'Event No Properties',
    });

    itly.track({
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
      itly.track({
        name: 'EventMaxIntForTest',
        properties: {
          intMax10: 20,
        },
      });
    } catch (e) {
    // do nothing
    }

    itly.reset();

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });
