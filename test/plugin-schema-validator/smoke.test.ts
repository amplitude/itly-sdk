/* eslint-disable import/no-unresolved,  no-unused-vars, global-require, import/extensions */
import { ItlyOptions, ItlyPlugin } from '../../packages/sdk-core/lib';
import SchemaValidator from '../../packages/plugin-schema-validator/lib';
import CustomPlugin from '../../test/src/CustomPlugin';

const testSchemas = require('../data/basic-schema.json');

type TestParams = {
  name: string;
  options: ItlyOptions,
};

const userId = 'test-user-id';
let spyConsoleLog: jest.SpyInstance;

const plugins: ItlyPlugin[] = [
  new SchemaValidator(testSchemas, (validation, event, schema) => {
    // eslint-disable-next-line no-console
    console.log(
      `SchemaValidator validationError() event='${event.name}' message='${validation.message}' schema=`,
      JSON.stringify(schema),
    );
  }),
  new CustomPlugin(),
];

const testParams: TestParams[] = [
  {
    name: 'load, track, validate - validationOptions=DEFAULT',
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'load, track, validate - validationOptions={trackInvalid: true}',
    options: {
      environment: 'production',
      plugins,
      validationOptions: {
        disabled: false,
        trackInvalid: true,
        errorOnInvalid: false,
      },
    },
  },
  {
    name: 'load, track, validate - validationOptions={errorOnInvalid: true}',
    options: {
      environment: 'production',
      plugins,
      validationOptions: {
        disabled: false,
        trackInvalid: false,
        errorOnInvalid: true,
      },
    },
  },
];

beforeEach(() => {
  jest.resetModules();
  spyConsoleLog = jest.spyOn(console, 'log');
});

afterEach(() => {
  spyConsoleLog.mockRestore();
});

test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
  async (name: string, { options }: TestParams) => {
    const { default: itly } = require('../../packages/sdk-core/lib');

    itly.load(options);

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
      // eslint-disable-next-line no-console
      console.log('Caught validation error.', e.message);
    }

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });
