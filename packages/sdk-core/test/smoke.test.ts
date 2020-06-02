/* eslint-disable import/no-unresolved, global-require */
/* eslint-disable import/extensions */
import itly from '../dist/index';
import CustomDestination from './src/CustomDestination';
import CustomLogger from './src/CustomLogger';

const testSchemas = require('./schemas/basic-schema.json');

test('should load, track events, and validate schema', () => {
  const spy = jest.spyOn(console, 'log');

  const userId = 'test-user-id';

  itly.load({
    environment: 'production',
    schemas: testSchemas,
    destinations: [
      new CustomDestination(),
    ],
    context: {
      requiredString: 'A required string',
      optionalEnum: 'Value 1',
    },
    logger: new CustomLogger(),
  });

  itly.track(userId, 'Event No Properties', {}, '26af925a-be3a-40e5-947d-33da66a5352f', '1-0-0');

  itly.track(
    userId,
    'Event With All Properties',
    {
      requiredString: 'A required string',
      requiredNumber: 2.0,
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredBoolean: false,
      requiredConst: 'some-const-value',
      requiredArray: ['required', 'array'],
      optionalString: 'I\'m optional!',
    },
    '311ba144-8532-4474-a9bd-8b430625e29a',
    '1-0-0',
  );

  try {
    itly.track(
      userId,
      'EventMaxIntForTest',
      {
        intMax10: 20,
      },
      'aa0f08ac-8928-4569-a524-c1699e7da6f4',
      '1-0-0',
    );
  } catch (e) {
    // do nothing
  }

  expect(spy.mock.calls).toMatchSnapshot();

  spy.mockRestore();
});
