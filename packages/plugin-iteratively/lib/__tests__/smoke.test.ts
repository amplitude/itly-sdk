/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
// eslint-disable-next-line no-unused-vars
import { ItlyBrowser as Itly, Environment } from '@itly/sdk';
import { requireForTestEnv } from '../../../../__tests__/util';

const IterativelyPlugin = requireForTestEnv(__dirname);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultTestUrl = 'https://localhost:4000';
const defaultTestApiKey = 'test-iteratively-api-key';

const defaultTestEvent = {
  name: 'Event Created',
  id: '6e242e86-30c1-403d-aefb-0f9f72255517',
  version: '1.0.0',
  properties: { },
};

const defaultFetchRequest = {
  body: expect.any(String),
  headers: {
    authorization: `Bearer ${defaultTestApiKey}`,
    'Content-Type': 'application/json',
  },
  method: 'post',
};

let itly: Itly | undefined;

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();

  global.fetch = jest.fn().mockImplementation();
  itly = new Itly();

  // NOTE: Create a script to prevent - 'TypeError: Cannot read property 'parentNode' of undefined'
  // https://github.com/walmartlabs/little-loader/issues/53
  const script = document.createElement('script');
  document.body.appendChild(script);
});

afterEach(() => {
  itly = undefined;
  delete global.fetch;
});

test.each([
  ['production'],
  ['development'],
])('should not crash on load (env: %s)', (environment) => {
  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      url: defaultTestUrl,
      environment,
    },
  );

  expect(() => {
    itly!.load({
      environment: environment as Environment,
      plugins: [iterativelyPlugin],
    });
  }).not.toThrow();
});

test('should not post if on production', async () => {
  const environment = 'production';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 1,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  await itly!.track(defaultTestEvent);

  expect(fetch).not.toBeCalled();
});

test('should post when flushAt reached', async () => {
  const environment = 'development';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 2,
      flushInterval: 10000,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const events = [0, 1].map((i) => ({
    ...defaultTestEvent,
    properties: {
      iteration: i,
    },
  }));

  await Promise.all(events.map((event) => itly!.track(event)));

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining(
      events.map((event) => expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: event.properties,
        valid: true,
        validation: {
          details: '',
        },
      })),
    ),
  });
});

test('should post in flushInterval', async () => {
  const environment = 'development';
  const flushInterval = 10;

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 100,
      flushInterval,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const events = [0, 1].map((i) => ({
    ...defaultTestEvent,
    properties: {
      iteration: i,
    },
  }));

  for (let i = 0; i < events.length; i += 1) {
    await itly!.track(events[i]);
    await wait(flushInterval / 2);
  }

  await wait(flushInterval);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining(
      events.map((event) => expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: event.properties,
        valid: true,
        validation: {
          details: '',
        },
      })),
    ),
  });
});

test('should post on explicit flush()', async () => {
  const environment = 'development';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const events = [0, 1].map((i) => ({
    ...defaultTestEvent,
    properties: {
      iteration: i,
    },
  }));

  for (let i = 0; i < events.length; i += 1) {
    await itly!.track(events[i]);
  }

  await itly!.flush();

  await wait(1000);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining(
      events.map((event) => expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: event.properties,
        valid: true,
        validation: {
          details: '',
        },
      })),
    ),
  });
});

test('should omit event properties if configured', async () => {
  const environment = 'development';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 1,
      omitValues: true,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const event = {
    ...defaultTestEvent,
    properties: {
      iteration: 1,
    },
  };

  await itly!.track(event);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining([
      expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: {
          iteration: null,
        },
        valid: true,
        validation: {
          details: '',
        },
      }),
    ]),
  });
});

test('should post track validation error', async () => {
  const environment = 'development';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 1,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const event = {
    ...defaultTestEvent,
    properties: {
      iteration: 1,
    },
  };

  const validationError = {
    valid: false,
    message: 'test validation error message',
  };

  iterativelyPlugin.postTrack(undefined, event, [validationError]);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining([
      expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: event.properties,
        valid: validationError.valid,
        validation: {
          details: validationError.message,
        },
      }),
    ]),
  });
});

test('should omit validation error details if configured', async () => {
  const environment = 'development';

  const iterativelyPlugin = new IterativelyPlugin(
    defaultTestApiKey,
    {
      environment,
      url: defaultTestUrl,
      flushAt: 1,
      omitValues: true,
    },
  );

  itly!.load({
    environment,
    plugins: [iterativelyPlugin],
  });

  const event = {
    ...defaultTestEvent,
    properties: {
      iteration: 1,
    },
  };

  const validationError = {
    valid: false,
    message: 'test validation error message',
  };

  iterativelyPlugin.postTrack(undefined, event, [validationError]);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(defaultTestUrl, defaultFetchRequest);

  expect(JSON.parse((fetch as any).mock.calls[0][1].body)).toMatchObject({
    objects: expect.arrayContaining([
      expect.objectContaining({
        type: 'track',
        eventId: event.id,
        eventName: event.name,
        eventSchemaVersion: event.version,
        properties: {
          iteration: null,
        },
        valid: validationError.valid,
        validation: {
          details: '',
        },
      }),
    ]),
  });
});
