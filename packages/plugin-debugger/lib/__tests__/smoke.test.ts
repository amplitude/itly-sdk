/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
import { requireForTestEnv } from '../../../../__tests__/util';

const DebuggerPlugin = requireForTestEnv(__dirname);

const debuggerApiKey = 'test-debugger-api-key';

let itly: any;

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk-core').default;

  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);
});

afterEach(() => {
  itly = undefined;
});

test('should load if itly is NOT disabled', () => {
  const debuggerPlugin = new DebuggerPlugin(
    debuggerApiKey,
    { url: 'https://localhost:4000' },
  );

  const spyDebuggerPluginLoad = jest.spyOn(debuggerPlugin, 'load');

  itly.load({
    environment: 'production',
    plugins: [debuggerPlugin],
    disabled: false,
  });

  expect(spyDebuggerPluginLoad).toHaveBeenCalled();
});

test('should NOT load if itly is enabled', () => {
  const debuggerPlugin = new DebuggerPlugin(
    debuggerApiKey,
    { url: 'https://localhost:4000' },
  );

  const spyDebuggerPluginLoad = jest.spyOn(debuggerPlugin, 'load');

  itly.load({
    environment: 'production',
    plugins: [debuggerPlugin],
    disabled: true,
  });

  expect(spyDebuggerPluginLoad).not.toHaveBeenCalled();
});
