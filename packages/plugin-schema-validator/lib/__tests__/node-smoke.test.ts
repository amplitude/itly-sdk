/**
 * Test for Node version of plugin-schema-validator
 * @jest-environment node
 */
/* eslint-disable no-unused-vars, no-console */
/* eslint-disable import/no-unresolved, import/extensions, import/no-dynamic-require */
import Itly, {
  Options, Plugin, Event, ValidationResponse,
} from '@itly/sdk';
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

const plugins: Plugin[] = [
  new SchemaValidator(testSchemas),
  new CustomPlugin(),
];

const testParams: TestParams[] = [
  {
    name: 'load, track, validate - validationOptions=DEFAULT',
    context,
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'load, track, validate - validationOptions={trackInvalid: true}',
    context,
    options: {
      environment: 'production',
      plugins,
      validation: {
        disabled: false,
        trackInvalid: true,
        errorOnInvalid: false,
      },
    },
  },
  {
    name: 'load, track, validate - validationOptions={errorOnInvalid: true}',
    context,
    options: {
      environment: 'production',
      plugins,
      validation: {
        disabled: false,
        trackInvalid: false,
        errorOnInvalid: true,
      },
    },
  },
  {
    name: 'load, track, validate w/ context=\'undefined\'',
    context: undefined,
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'load, track, validate w/ context=\'{}\'',
    context: {},
    options: {
      environment: 'production',
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
  spyConsoleLog = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  spyConsoleLog.mockRestore();
});

test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
  async (name: string, { context: ctx, options }: TestParams) => {
    const itly = new Itly();

    itly.load({
      ...options,
      context: ctx,
    });

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
