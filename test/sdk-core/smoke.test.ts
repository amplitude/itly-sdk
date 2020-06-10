/* eslint-disable import/no-unresolved, global-require, import/extensions */
import itly from '../../packages/sdk-core/lib';
import CustomPlugin from '../../test/src/CustomPlugin';

// const testSchemas = require('./schemas/basic-schema.json');
// new SchemaValidator(testSchemas),

test('should load and track events to a custom destination (no validation)', () => {
  const spy = jest.spyOn(console, 'log');

  const userId = 'test-user-id';

  // new SchemaValidator(testSchemas)
  itly.load({
    environment: 'production',
    context: {
      requiredString: 'A required string',
      optionalEnum: 'Value 1',
    },
    plugins: [new CustomPlugin()],
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

  expect(spy.mock.calls).toMatchSnapshot();

  spy.mockRestore();
});
