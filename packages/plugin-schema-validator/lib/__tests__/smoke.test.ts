/* eslint-disable no-unused-vars, global-require */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import {
  ItlyOptions, ItlyPlugin, ItlyEvent, ValidationResponse,
} from '@itly/sdk-core';
import CustomPlugin from '../../../../__tests__/src/CustomPlugin';
import {
  TestParams,
  requireForTestEnv,
} from '../../../../__tests__/util';

const SchemaValidator = requireForTestEnv(__dirname);

const testSchemas = require('../../../../__tests__/data/basic-schema.json');

const userId = 'test-user-id';
let spyConsoleLog: jest.SpyInstance;

const plugins: ItlyPlugin[] = [
  new SchemaValidator(
    testSchemas,
    (validation: ValidationResponse, event: ItlyEvent, schema: any) => {
    // eslint-disable-next-line no-console
      console.log(
        `SchemaValidator validationError() event='${event.name}' message='${validation.message}' schema=`,
        JSON.stringify(schema),
      );
    },
  ),
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
    const { default: itly } = require('@itly/sdk-core');

    itly.load(options);

    itly.track(userId, {
      name: 'Event No Properties',
      properties: {},
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
      // eslint-disable-next-line no-console
      console.log('Caught validation error.', e.message);
    }

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });
