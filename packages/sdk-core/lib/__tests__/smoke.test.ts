/* eslint-disable import/no-unresolved, import/extensions, global-require */
/* eslint-disable no-unused-vars, class-methods-use-this */
import requireForTestEnv from '../../../../__tests__/util/requireForTestEnv';

class CustomPlugin {
  LOG_TAG = 'CustomPlugin';

  // eslint-disable-next-line no-console
  private log = (...messages: any[]) => console.log(`${this.LOG_TAG}: `, ...messages);

  private stringify = (object: any) => JSON.stringify(object);

  id(): string {
    return 'custom';
  }

  alias(userId: string, previousId: string | undefined): void {
    this.log(`alias() userId='${userId}' previousId='${previousId}'`);
  }

  group(userId: string | undefined, groupId: string, properties?: any): void {
    this.log(`group() userId='${userId}' groupId='${groupId}' properties=${this.stringify(properties)}`);
  }

  identify(userId: string | undefined, properties?: any): void {
    this.log(`identify() userId='${userId}' properties=${this.stringify(properties)}`);
  }

  load(options: any): void {
    this.log(`load() \
environment='${options.environment}' \
disabled=${options.disabled} \
plugins=[${options.plugins ? options.plugins.map((p: any) => p.id()).join(', ') : ''}] \
context=${this.stringify(options.context)} \
validationOptions=${this.stringify(options.validationOptions)}`);
  }

  page(userId?: string, category?: string, name?: string, properties?: any): void {
    this.log(`page() userId='${userId}' category='${category}' name='${name}' properties=${this.stringify(properties)}`);
  }

  reset(): void {
    this.log('reset()');
  }

  track(userId: string | undefined, event: any): void {
    this.log(`track() userId='${userId}' event='${event.name}' properties=${this.stringify(event.properties)}`);
  }

  validate() {
    return {
      valid: true,
      pluginId: this.id(),
    };
  }

  validationError(validation: any, event: any) {
    this.log(`validationError() event='${event.name}' plugin=${validation.pluginId} message=${validation.message}`);
  }
}


const plugins = [new CustomPlugin()];

export type TestParams = {
  name: string;
  options: any,
};

const testParams: TestParams[] = [
  {
    name: 'context = undefined',
    options: {
      environment: 'production',
      plugins,
    },
  },
  {
    name: 'context = 2 properties',
    options: {
      environment: 'production',
      plugins,
      context: {
        requiredString: 'A required string',
        optionalEnum: 'Value 1',
      },
    },
  },
];

const userId = 'test-user-id';
const groupId = 'test-group-id';
let spyConsoleLog: jest.SpyInstance;

describe('should load and track events to a custom destination (no validation)', () => {
  beforeEach(() => {
    jest.resetModules();
    spyConsoleLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  test.each(testParams.map((test) => [test.name, test]) as any[])('%s',
    async (name: string, { options }: TestParams) => {
      const itly = requireForTestEnv(__dirname);

      // Try tracking before load, should throw errror
      try {
        itly.identify(userId);
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(`Caught expected error. ${e.message}`);
      }

      itly.load(options);

      itly.identify(undefined);
      itly.alias(userId);
      itly.group(userId, groupId);

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

      expect(spyConsoleLog.mock.calls).toMatchSnapshot();

      spyConsoleLog.mockRestore();
    });
});
