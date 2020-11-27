
/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  PluginBase, Event as TrackingEvent,
} from '@itly/sdk';

type MethodArgs = any[];

type AvailableMethodNames = 'alias' | 'identify' | 'group' | 'page' | 'track';

export interface ITestingPlugin {
  reset(): void;
  // return an ordered array of all events were tracked
  all(userId?: string): TrackingEvent[];
  // return all events filtered by class constructor
  ofType(ev: TrackingEvent, userId?: string): TrackingEvent[];
  // return first event matched by class constructor
  firstOfType(ev: TrackingEvent, userId?: string): TrackingEvent;
}

export class TestingPlugin extends PluginBase implements ITestingPlugin {
  static ID = 'testing';

  id = () => TestingPlugin.ID;

  private calls: Map<AvailableMethodNames, MethodArgs[]> = new Map();

  private readonly trackingMethods: AvailableMethodNames[] = ['alias', 'identify', 'group', 'page', 'track'];

  constructor() {
    super();
    this.init();
  }

  public reset() {
    this.init();
  }

  all(userId?: string) {
    const calls = this.safelyGetCalls('track');

    if (userId) {
      return calls.reduce<TrackingEvent[]>((acc, [id, ev]) => {
        if (userId === id) {
          return acc.concat(ev);
        }
        return acc;
      }, []);
    }

    return calls.map(this.mapMethodArgs);
  }

  ofType(ctor: Function, userId?: string) {
    return this.safelyGetCalls('track')
      .filter(([id, ev]) => ev instanceof ctor && (!userId || userId === id))
      .map<TrackingEvent>(([, ev]) => ev);
  }

  firstOfType(ctor: Function, userId?: string) {
    const tuple = this.safelyGetCalls('track').find(([id, ev]) => ev instanceof ctor && (!userId || userId === id));
    return tuple ? this.mapMethodArgs(tuple) : null;
  }

  alias(...args: any[]) {
    this.trackCall('alias', args);
  }

  identify(...args: any[]) {
    this.trackCall('identify', args);
  }

  group(...args: any[]) {
    this.trackCall('group', args);
  }

  page(...args: any[]) {
    this.trackCall('page', args);
  }

  track(...args: any[]) {
    this.trackCall('track', args);
  }

  private init() {
    this.trackingMethods.forEach((methodName) => {
      this.calls.set(methodName, []);
    });
  }

  private trackCall(methodName: AvailableMethodNames, args: MethodArgs) {
    this.safelyGetCalls(methodName).push(args);
  }

  private safelyGetCalls(prop: AvailableMethodNames) {
    return this.calls.get(prop) || [];
  }

  private mapMethodArgs([id, ev]: MethodArgs) {
    return ev;
  }
}

export default TestingPlugin;
