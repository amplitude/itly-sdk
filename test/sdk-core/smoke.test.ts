/* eslint-disable import/no-unresolved, global-require */
/* eslint-disable import/extensions */
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
    id: '26af925a-be3a-40e5-947d-33da66a5352f',
    version: '1-0-0',
    properties: {},
  });

  itly.track(userId, {
    name: 'Event With All Properties',
    id: '311ba144-8532-4474-a9bd-8b430625e29a',
    version: '1-0-0',
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
      id: 'aa0f08ac-8928-4569-a524-c1699e7da6f4',
      version: '1-0-0',
      properties: {
        intMax10: 20,
      },
    });
  } catch (e) {
    // do nothing
  }

  expect(spy.mock.calls).toMatchSnapshot();

  spy.mockRestore();
});
