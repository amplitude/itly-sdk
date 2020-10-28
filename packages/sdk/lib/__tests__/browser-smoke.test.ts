/**
 * Test for Browser version of SDK
 * @jest-environment jsdom
 */
/* eslint-disable import/no-unresolved, global-require, import/extensions, no-unused-vars */
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import ErrorPlugin from '../../../../__tests__/src/ErrorPlugin';
import requireForTestEnv from '../../../../__tests__/util/requireForTestEnv';
import DummyPlugin from '../../../../__tests__/src/DummyPlugin';

beforeEach(() => {
  jest.resetModules();
});

test('should load and track events to a custom destination (no validation)', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  const userId = 'test-user-id';

  const itly = requireForTestEnv(__dirname);

  itly.load({
    environment: 'production',
    context: {
      requiredString: 'A required string',
      optionalEnum: 'Value 1',
    },
    plugins: [new CustomPlugin()],
  });

  itly.identify(undefined, {
    userProp: 1,
  });

  itly.alias(userId);

  itly.group('a-group-id', {
    groupProp: 'test value',
  });

  itly.page('page category', 'page name', {
    pageProp: 'a page property',
  });

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

  const customOnly = itly.getPlugin('custom');
  // eslint-disable-next-line no-console
  console.log('CustomPlugin.id()', customOnly!.id());

  expect(consoleSpy.mock.calls).toMatchSnapshot();

  consoleSpy.mockRestore();
});

test('other plugins should continue if another plugin throws errors in callback methods', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  const itly = requireForTestEnv(__dirname);

  const id = 'user-id';
  const dummyPlugin = new DummyPlugin();
  const methodsToSpyOn: string[] = [
    'load',
    'alias',
    'identify', 'group', 'page', 'track',
    'postIdentify', 'postGroup', 'postTrack',
    'reset',
  ];

  const pluginSpies: { [key: string]: jest.SpyInstance } = {};
  methodsToSpyOn.forEach((method) => {
    pluginSpies[method] = jest.spyOn(dummyPlugin, method as any);
  });

  itly.load({
    environment: 'production',
    plugins: [
      new ErrorPlugin(),
      dummyPlugin,
    ],
  });
  itly.identify('tmp-id');
  itly.alias(id, 'tmp-id');
  itly.group('group-id');
  itly.page('category', 'name');
  itly.track({
    name: 'my-event',
    properties: {
      prop: 'a value',
    },
  });
  itly.reset();

  methodsToSpyOn.forEach((method) => {
    expect(pluginSpies[method]).toHaveBeenCalledTimes(1);
  });

  expect(consoleSpy.mock.calls).toMatchSnapshot();
  consoleSpy.mockRestore();
});
