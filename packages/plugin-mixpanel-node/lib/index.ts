/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, Properties, PluginLoadOptions,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

/**
 * Mixpanel Node Plugin for Iteratively SDK
 */
export class MixpanelPlugin extends Plugin {
  private mixpanel?: Mixpanel.Mixpanel;

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load(options: PluginLoadOptions) {
    super.load(options);
    this.mixpanel = Mixpanel.init(this.apiKey, this.options);
  }

  alias(userId: string, previousId: string) {
    const responseLogger = this.logger!.logRequest('alias', `${userId}, ${previousId}`);
    this.mixpanel!.alias(previousId, userId, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
    });
  }

  identify(userId: string, properties: Properties | undefined) {
    const payload = {
      distinct_id: userId,
      ...properties,
    };
    const responseLogger = this.logger!.logRequest('identify', JSON.stringify(payload));
    this.mixpanel!.people.set(userId, payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
    });
  }

  track(userId: string, event: Event) {
    const payload = {
      distinct_id: userId,
      ...event.properties,
    };
    const responseLogger = this.logger!.logRequest('track', JSON.stringify(payload));
    this.mixpanel!.track(event.name, payload, (err: Error | undefined) => {
      if (err == null) {
        responseLogger.success('success');
      } else {
        responseLogger.error(err.toString());
      }
    });
  }
}

export default MixpanelPlugin;
