/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, Properties, Logger, PluginLoadOptions,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

/**
 * Mixpanel Node Plugin for Iteratively SDK
 */
export class MixpanelPlugin extends Plugin {
  private mixpanel?: Mixpanel.Mixpanel;

  private logger: Logger | undefined;

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load(options: PluginLoadOptions) {
    this.mixpanel = Mixpanel.init(this.apiKey, this.options);
    this.logger = options.logger;
  }

  alias(userId: string, previousId: string) {
    const id = +new Date();
    this.logger!.debug(`${this.id}: alias(request) ${id}: ${userId}, ${previousId}`);
    this.mixpanel!.alias(previousId, userId, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: alias(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: alias(response) ${id}: ${err}`);
      }
    });
  }

  identify(userId: string, properties: Properties | undefined) {
    const id = +new Date();
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    this.logger!.debug(`${this.id}: identify(request) ${id}: ${JSON.stringify(payload)}`);
    this.mixpanel!.people.set(userId, payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: identify(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: identify(response) ${id}: ${err}`);
      }
    });
  }

  track(userId: string, event: Event) {
    const id = +new Date();
    const payload = {
      distinct_id: userId,
      ...event.properties,
    };
    this.logger!.debug(`${this.id}: track(request) ${id}: ${JSON.stringify(payload)}`);
    this.mixpanel!.track(event.name, payload, (err: Error | undefined) => {
      if (err == null) {
        this.logger!.debug(`${this.id}: track(response) ${id}: success`);
      } else {
        this.logger!.error(`${this.id}: track(response) ${id}: ${err}`);
      }
    });
  }
}

export default MixpanelPlugin;
