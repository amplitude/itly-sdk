/* eslint-disable no-unused-vars, global-require */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
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
    name: 'AmplitudePlugin dummy test',
    options: {
      environment: 'production',
      plugins: [],
    },
  },
];

beforeEach(() => {
  jest.resetModules();
  spyConsoleLog = jest.spyOn(console, 'log');

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
  console.log(`${methodName}()`, JSON.stringify(args));
};

test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
  async (name: string, { options }: TestParams) => {
    const { default: itly } = require('@itly/sdk-core');

    const mocks: { [key: string]: any } = {};
    ['init', 'identify', 'track', 'setUserId', 'regenerateDeviceId', 'logEvent'].forEach((mockMethod) => {
      mocks[mockMethod] = jest.fn().mockImplementation(
        (...args) => methodArgLoggerMock(mockMethod, ...args),
      );
    });

    const spyAmplitudePlugin = jest.spyOn(AmplitudePlugin, 'getGlobalAmplitude').mockImplementation(() => ({
      Identify: jest.fn(),
      getInstance: () => mocks,
    }));

    const plugin = new AmplitudePlugin('an-amplitude-api-key');

    // Try tracking before load, should throw errror
    try {
      itly.identify(userId);
    } catch (e) {
    // eslint-disable-next-line no-console
      console.log(`Caught expected error. ${e.message}`);
    }

    itly.load({
      ...options,
      plugins: [plugin].concat(options.plugins),
    });

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

    const pluginFromItly = itly.getPlugin('amplitude');
    // eslint-disable-next-line no-console
    console.log('AmplitudePlugin.id()', pluginFromItly!.id());

    itly.reset();

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });
