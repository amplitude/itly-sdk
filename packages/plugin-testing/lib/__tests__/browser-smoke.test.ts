/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
// eslint-disable-next-line max-classes-per-file, no-unused-vars
import { ItlyBrowser as Itly, Plugin } from '@itly/sdk';
import { requireForTestEnv } from '../../../../__tests__/util';
// eslint-disable-next-line no-unused-vars
import { ITestingPlugin } from '../index';

const TestingPlugin = requireForTestEnv(__dirname);

let itly: Itly;
let testingPlugin: ITestingPlugin & Plugin;

class DataSearchedEvent {
  readonly name = 'DataSearchedEvent';

  // eslint-disable-next-line no-useless-constructor,no-unused-vars,no-empty-function
  constructor(public properties: any) {
  }
}

class DataFilteredEvent {
  readonly name = 'DataFilteredEvent';

  // eslint-disable-next-line no-unused-vars,no-useless-constructor,no-empty-function
  constructor(public properties: any) {
  }
}

class StreamPausedEvent {
  readonly name = 'StreamPausedEvent';
}

beforeEach(() => {
  jest.resetModules();

  itly = new Itly();
  testingPlugin = new TestingPlugin();

  itly.load({
    environment: 'production',
    plugins: [testingPlugin],
  });
});

describe('TestingPlugin/browser', () => {
  it('plugin.all', async () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    await itly.track(dataSearchedEvent1);
    await itly.track(dataSearchedEvent2);
    await itly.track(dataSearchedEvent3);

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);
  });

  it('plugin.ofType', async () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    await itly.track(dataSearchedEvent1);
    await itly.track(dataSearchedEvent2);
    await itly.track(dataSearchedEvent3);

    expect(testingPlugin.ofType(DataSearchedEvent)).toHaveLength(3);
    // eslint-disable-next-line max-len
    expect(testingPlugin.ofType(DataSearchedEvent)).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);
  });

  it('plugin.firstOfType', async () => {
    const dataSearchedEvent = new DataSearchedEvent({ page: 'Stream' });
    const dataFilteredEvent = new DataFilteredEvent({ page: 'Stream' });
    const streamPausedEvent = new StreamPausedEvent();

    await itly.track(dataSearchedEvent);
    await itly.track(dataFilteredEvent);
    await itly.track(streamPausedEvent);

    expect(testingPlugin.firstOfType(StreamPausedEvent)).toEqual(streamPausedEvent);
  });

  it('plugin.reset', async () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    await Promise.all([
      dataSearchedEvent1,
      dataSearchedEvent2,
      dataSearchedEvent3,
    ].map((ev) => itly.track(ev)));

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);

    testingPlugin.reset();

    expect(testingPlugin.all()).toHaveLength(0);
    expect(testingPlugin.all()).toEqual([]);
  });
});
