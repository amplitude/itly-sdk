/* eslint-disable no-unused-vars, global-require, no-console */
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

const context = {
  requiredString: 'is required',
  optionalEnum: 'Value 1',
};

const identifyProps = {
  requiredNumber: 42,
};

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
      context,
      plugins,
    },
  },
  {
    name: 'load, track, validate - validationOptions={trackInvalid: true}',
    options: {
      environment: 'production',
      context,
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
      context,
      plugins,
      validationOptions: {
        disabled: false,
        trackInvalid: false,
        errorOnInvalid: true,
      },
    },
  },
  {
    name: 'load, track, validate w/ context=\'undefined\'',
    options: {
      environment: 'production',
      context: undefined,
      plugins,
    },
  },
  {
    name: 'load, track, validate w/ context=\'{}\'',
    options: {
      environment: 'production',
      context: {},
      plugins,
    },
  },
];

// Test vars
const userId = 'test-user-id';
const tempUserId = 'temp-user-id';
const groupId = 'test-group-id';
let spyConsoleLog: jest.SpyInstance;

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

    itly.identify(undefined, identifyProps);
    itly.identify(tempUserId, identifyProps);
    try {
      itly.identify(tempUserId);
    } catch (e) {
      console.log('Caught validation error.', e.message);
    }
    try {
      itly.identify(tempUserId, {
        badProp: 'unsupported property',
      });
    } catch (e) {
      console.log('Caught validation error.', e.message);
    }

    itly.alias(userId);
    itly.alias(userId, tempUserId);

    try {
      itly.group(userId, groupId);
    } catch (e) {
      console.log('Caught validation error.', e.message);
    }
    itly.group(userId, groupId, {
      requiredBoolean: true,
      optionalString: undefined,
    });

    try {
      itly.page(userId, 'page category 1', 'page name 1');
    } catch (e) {
      console.log('Caught validation error.', e.message);
    }

    try {
      itly.page(userId, 'page category 2', 'page name 2', {
        pageProp: 'a page property',
      });
    } catch (e) {
      console.log('Caught validation error.', e.message);
    }

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
      console.log('Caught validation error.', e.message);
    }

    expect(spyConsoleLog.mock.calls).toMatchSnapshot();
  });