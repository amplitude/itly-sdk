
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
// eslint-disable-next-line max-classes-per-file
import { requireForTestEnv } from '../../../../__tests__/util';
import { ITestingPlugin } from '../index';

const TestingPlugin = requireForTestEnv(__dirname);

let itly: any;
let testingPlugin: ITestingPlugin;

class DataSearchedEvent {
  constructor(public properties: any) {
  }
}

class DataFilteredEvent {
  constructor(public properties: any) {
  }
}

class StreamPausedEvent {}

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk/node').default;
  testingPlugin = new TestingPlugin();

  itly.load({
    environment: 'production',
    plugins: [testingPlugin],
  });
});

describe('TestingPlugin/node', () => {
  it('plugin.all', () => {
    const userId = 'user1';
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    [dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3].forEach((ev) => itly.track(userId, ev));

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all(userId)).toHaveLength(3);

    expect(testingPlugin.all()).toEqual([
      expect.arrayContaining([userId, dataSearchedEvent1]),
      expect.arrayContaining([userId, dataSearchedEvent2]),
      expect.arrayContaining([userId, dataSearchedEvent3]),
    ]);

    expect(testingPlugin.all(userId)).toEqual([
      dataSearchedEvent1,
      dataSearchedEvent2,
      dataSearchedEvent3,
    ]);
  });

  it('plugin.ofType', () => {
    const userId = 'user1';
    const userId2 = 'user2';
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    [dataSearchedEvent1, dataSearchedEvent2].forEach((ev) => itly.track(userId, ev));
    itly.track(userId2, dataSearchedEvent3);

    expect(testingPlugin.ofType(DataSearchedEvent)).toHaveLength(3);
    // eslint-disable-next-line max-len
    expect(testingPlugin.ofType(DataSearchedEvent)).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);
    // eslint-disable-next-line max-len
    expect(testingPlugin.ofType(DataSearchedEvent, userId2)).toEqual([dataSearchedEvent3]);
  });

  it('plugin.firstOfType', () => {
    const userId1 = 'user1';
    const userId2 = 'user1';
    const userId3 = 'user1';
    const dataSearchedEvent = new DataSearchedEvent({ page: 'Stream' });
    const dataFilteredEvent = new DataFilteredEvent({ page: 'Stream' });
    const streamPausedEvent = new StreamPausedEvent();

    itly.track(userId1, dataSearchedEvent);
    itly.track(userId2, dataFilteredEvent);
    itly.track(userId3, streamPausedEvent);

    expect(testingPlugin.firstOfType(StreamPausedEvent)).toEqual(expect.arrayContaining([streamPausedEvent]));
    expect(testingPlugin.firstOfType(StreamPausedEvent, userId3)).toEqual(expect.arrayContaining([streamPausedEvent]));
  });

  it('plugin.reset', () => {
    const userId = 'user1';
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    [dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3].forEach((ev) => itly.track(userId, ev));

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([
      expect.arrayContaining([userId, dataSearchedEvent1]),
      expect.arrayContaining([userId, dataSearchedEvent2]),
      expect.arrayContaining([userId, dataSearchedEvent3]),
    ]);

    testingPlugin.reset();

    expect(testingPlugin.all()).toHaveLength(0);
    expect(testingPlugin.all()).toEqual([]);
    expect(testingPlugin.all(userId)).toHaveLength(0);
    expect(testingPlugin.all(userId)).toEqual([]);
  });
});
