/* eslint-disable no-unused-vars, class-methods-use-this, import/no-unresolved */
import {
  ItlyOptions, ItlyEvent, ItlyProperties, ItlyPluginBase,
} from '@itly/sdk-node';
import Mixpanel, { InitConfig } from 'mixpanel';

export interface MixpanelOptions extends InitConfig {}

export default class MixpanelNodePlugin extends ItlyPluginBase {
  static ID: string = 'mixpanel';

  private mixpanel: Mixpanel.Mixpanel;

  constructor(options: ItlyOptions, apiKey: string, mixpanelOptions: MixpanelOptions) {
    super();
    this.mixpanel = Mixpanel.init(apiKey, mixpanelOptions);
  }

  id = () => MixpanelNodePlugin.ID;

  alias(userId: string, previousId: string) {
    this.mixpanel.alias(previousId, userId);
  }

  identify(userId: string, properties: ItlyProperties | undefined) {
    this.mixpanel.people.set(userId, {
      distinct_id: userId,
      ...properties,
    });
  }

  track(userId: string, event: ItlyEvent) {
    this.mixpanel.track(event.name, {
      distinct_id: userId,
      ...event.properties,
    });
  }
}
