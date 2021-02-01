/**
 * Test for Node version of plugin-testing
 * @jest-environment node
 */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
// eslint-disable-next-line max-classes-per-file, no-unused-vars
import { ItlyNode as Itly, Plugin } from '@itly/sdk';
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

  // eslint-disable-next-line no-useless-constructor,no-unused-vars,no-empty-function
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

  itly.load(undefined, {
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

    const arrOfEvents = [
      dataSearchedEvent1,
      dataSearchedEvent2,
      dataSearchedEvent3,
    ];

    expect(testingPlugin.all()).toEqual(arrOfEvents);
    expect(testingPlugin.all(userId)).toEqual(arrOfEvents);
    expect(testingPlugin.all('random')).toEqual([]);
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
    expect(testingPlugin.ofType(DataSearchedEvent, 'random')).toEqual([]);
  });

  it('plugin.firstOfType', () => {
    const userId1 = 'user1';
    const userId2 = 'user2';
    const userId3 = 'user3';
    const dataSearchedEvent = new DataSearchedEvent({ page: 'Stream' });
    const dataFilteredEvent = new DataFilteredEvent({ page: 'Stream' });
    const streamPausedEvent = new StreamPausedEvent();

    itly.track(userId1, dataSearchedEvent);
    itly.track(userId2, dataFilteredEvent);
    itly.track(userId3, streamPausedEvent);

    expect(testingPlugin.firstOfType(StreamPausedEvent)).toEqual(streamPausedEvent);
    expect(testingPlugin.firstOfType(StreamPausedEvent, userId3)).toEqual(streamPausedEvent);
    expect(testingPlugin.firstOfType(StreamPausedEvent, userId2)).toEqual(null);
    expect(testingPlugin.firstOfType(DataSearchedEvent, userId2)).toEqual(null);
  });

  it('plugin.reset', () => {
    const userId = 'user1';
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    [dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3].forEach((ev) => itly.track(userId, ev));

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([
      dataSearchedEvent1,
      dataSearchedEvent2,
      dataSearchedEvent3,
    ]);

    testingPlugin.reset();

    expect(testingPlugin.all()).toHaveLength(0);
    expect(testingPlugin.all()).toEqual([]);
    expect(testingPlugin.all(userId)).toHaveLength(0);
    expect(testingPlugin.all(userId)).toEqual([]);
  });
});
