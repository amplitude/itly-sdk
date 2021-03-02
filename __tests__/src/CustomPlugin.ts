/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  PluginLoadOptions, Event, Properties, Plugin, RequestLoggerPlugin, ValidationResponse,
} from '../../packages/sdk';

export { Plugin };

export default class CustomPlugin extends RequestLoggerPlugin {
  LOG_TAG = 'CustomPlugin';

  // eslint-disable-next-line no-console
  private log = (...messages: any[]) => console.log(`${this.LOG_TAG}: `, ...messages);

  private stringify = (object: any) => JSON.stringify(object);

  constructor() {
    super('custom');
  }

  load(options: PluginLoadOptions): void {
    super.load(options);
    this.log(`load() environment='${options.environment}'`);
  }

  validate(event: Event): ValidationResponse {
    this.log(`validate() event='${event.name}' properties=${this.stringify(event.properties)}`);
    return {
      valid: true,
    };
  }

  alias(userId: string, previousId: string | undefined): void {
    this.log(`alias() userId='${userId}' previousId='${previousId}'`);
  }

  identify(userId: string | undefined, properties: Properties | undefined): void {
    this.log(`identify() userId='${userId}' properties=${this.stringify(properties)}`);
  }

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.log(
      `postIdentify() userId='${userId}' properties=${this.stringify(properties)} validationResponses=${this.stringify(
        validationResponses,
      )}`,
    );
  }

  group(userId: string | undefined, groupId: string, properties: Properties | undefined): void {
    this.log(`group() userId='${userId}' groupId='${groupId}' properties=${this.stringify(properties)}`);
  }

  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.log(
      `postGroup() userId='${userId}' groupId='${groupId}' properties=${this.stringify(
        properties,
      )} validationResponses=${this.stringify(validationResponses)}`,
    );
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties): void {
    this.log(
      `page() userId='${userId}' category='${category}' name='${name}' properties=${this.stringify(properties)}`,
    );
  }

  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    this.log(
      `postPage() userId='${userId}' category='${category}' name='${name}' properties=${this.stringify(
        properties,
      )} validationResponses=${this.stringify(validationResponses)}`,
    );
  }

  track(userId: string | undefined, { name, properties }: Event): void {
    this.log(`track() userId='${userId}' event='${name}' properties=${this.stringify(properties)}`);
  }

  postTrack(userId: string | undefined, event: Event, validationResponses: ValidationResponse[]): void {
    this.log(
      `postTrack() userId='${userId}' event='${event.name}' properties=${this.stringify(
        event.properties,
      )} validationResponses=${this.stringify(validationResponses)}`,
    );
  }

  reset(): void {
    this.log('reset()');
  }

  async flush() {
    this.log('flush()');
  }
}
