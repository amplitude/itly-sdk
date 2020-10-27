
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require, import/no-unresolved, import/extensions */
// eslint-disable-next-line max-classes-per-file
import { requireForTestEnv } from '../../../../__tests__/util';
// eslint-disable-next-line no-unused-vars
import { ITestingPlugin } from '../index';

const TestingPlugin = requireForTestEnv(__dirname);

let itly: any;
let testingPlugin: ITestingPlugin;

class DataSearchedEvent {
  // eslint-disable-next-line no-useless-constructor,no-unused-vars,no-empty-function
  constructor(public properties: any) {
  }
}

class DataFilteredEvent {
  // eslint-disable-next-line no-unused-vars,no-useless-constructor,no-empty-function
  constructor(public properties: any) {
  }
}

class StreamPausedEvent {}

beforeEach(() => {
  jest.resetModules();

  itly = require('@itly/sdk').default;
  testingPlugin = new TestingPlugin();

  itly.load({
    environment: 'production',
    plugins: [testingPlugin],
  });
});

describe('TestingPlugin/browser', () => {
  it('plugin.all', () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    itly.track(dataSearchedEvent1);
    itly.track(dataSearchedEvent2);
    itly.track(dataSearchedEvent3);

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);
  });

  it('plugin.ofType', () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    itly.track(dataSearchedEvent1);
    itly.track(dataSearchedEvent2);
    itly.track(dataSearchedEvent3);

    expect(testingPlugin.ofType(DataSearchedEvent)).toHaveLength(3);
    // eslint-disable-next-line max-len
    expect(testingPlugin.ofType(DataSearchedEvent)).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);
  });

  it('plugin.firstOfType', () => {
    const dataSearchedEvent = new DataSearchedEvent({ page: 'Stream' });
    const dataFilteredEvent = new DataFilteredEvent({ page: 'Stream' });
    const streamPausedEvent = new StreamPausedEvent();

    itly.track(dataSearchedEvent);
    itly.track(dataFilteredEvent);
    itly.track(streamPausedEvent);

    expect(testingPlugin.firstOfType(StreamPausedEvent)).toEqual(streamPausedEvent);
  });

  it('plugin.reset', () => {
    const dataSearchedEvent1 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent2 = new DataSearchedEvent({ page: 'Stream' });
    const dataSearchedEvent3 = new DataSearchedEvent({ page: 'Stream' });

    [
      dataSearchedEvent1,
      dataSearchedEvent2,
      dataSearchedEvent3,
    ].forEach((ev) => itly.track(ev));

    expect(testingPlugin.all()).toHaveLength(3);
    expect(testingPlugin.all()).toEqual([dataSearchedEvent1, dataSearchedEvent2, dataSearchedEvent3]);

    testingPlugin.reset();

    expect(testingPlugin.all()).toHaveLength(0);
    expect(testingPlugin.all()).toEqual([]);
  });
});
