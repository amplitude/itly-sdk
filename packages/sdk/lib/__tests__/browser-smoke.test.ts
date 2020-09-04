/**
 * Test for Browser version of SDK
 * @jest-environment jsdom
 */
/* eslint-disable import/no-unresolved, global-require, import/extensions, no-unused-vars */
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import requireForTestEnv from '../../../../__tests__/util/requireForTestEnv';

test('should load and track events to a custom destination (no validation)', () => {
  const spy = jest.spyOn(console, 'log').mockImplementation();
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

  expect(spy.mock.calls).toMatchSnapshot();

  spy.mockRestore();
});
