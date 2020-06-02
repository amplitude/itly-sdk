// eslint-disable-next-line no-unused-vars
import { ItlyProperties, ItlyDestination } from '../../dist/index';

export default class CustomDestination implements ItlyDestination {
  LOG_TAG = 'CustomDestination';

  // eslint-disable-next-line no-console
  private log = (...messages: any[]) => console.log(`${this.LOG_TAG}: `, ...messages);

  private stringify = (object: any) => JSON.stringify(object);

  id = () => 'custom';

  alias(userId: string, previousId: string | undefined): void {
    this.log(`alias() userId='${userId}' previousId='${previousId}'`);
  }

  group(userId: string | undefined, groupId: string, properties: ItlyProperties | undefined): void {
    this.log(`group() userId='${userId}' groupId='${groupId}' properties=${this.stringify(properties)}`);
  }

  identify(userId: string | undefined, properties: ItlyProperties | undefined): void {
    this.log(`identify() userId='${userId}' properties=${this.stringify(properties)}`);
  }

  init(): void {
    this.log('init()');
  }

  page(userId?: string, category?: string, name?: string, properties?: ItlyProperties): void {
    this.log(`page() userId='${userId}' category='${category}' name='${name}' properties=${this.stringify(properties)}`);
  }

  reset(): void {
    this.log('reset()');
  }

  track(userId: string | undefined, eventName: string, properties: ItlyProperties): void {
    this.log(`track() userId='${userId}' event='${eventName}' properties=${this.stringify(properties)}`);
  }
}
