/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Plugin, Event, Properties,
} from '@itly/sdk';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export default class MixpanelNodePlugin extends Plugin {
  private mixpanel?: Mixpanel.Mixpanel;

  constructor(
    private apiKey: string,
    private options?: MixpanelOptions,
  ) {
    super('mixpanel');
  }

  load() {
    this.mixpanel = Mixpanel.init(this.apiKey, this.options);
  }

  alias(userId: string, previousId: string) {
    this.mixpanel!.alias(previousId, userId);
  }

  identify(userId: string, properties: Properties | undefined) {
    this.mixpanel!.people.set(userId, {
      distinct_id: userId,
      ...properties,
    });
  }

  track(userId: string, event: Event) {
    this.mixpanel!.track(event.name, {
      distinct_id: userId,
      ...event.properties,
    });
  }
}
