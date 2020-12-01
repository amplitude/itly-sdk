/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  PluginLoadOptions, Event, Properties, Plugin, ValidationResponse,
} from '../../packages/sdk/lib';

export default class ErrorPlugin extends Plugin {
  constructor() {
    super('error-plugin');
  }

  load(options: PluginLoadOptions): void {
    throw new Error('Error in load().');
  }

  validate(event: Event): ValidationResponse {
    return {
      valid: true,
      pluginId: this.id,
    };
  }

  alias(userId: string, previousId: string | undefined): void {
    throw new Error('Error in alias().');
  }

  identify(userId: string | undefined, properties: Properties | undefined): void {
    throw new Error('Error in identify().');
  }

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    throw new Error('Error in postIdentify().');
  }

  group(userId: string | undefined, groupId: string, properties: Properties | undefined): void {
    throw new Error('Error in group().');
  }

  postGroup(
    userId: string | undefined,
    groupId: string,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    throw new Error('Error in postGroup().');
  }

  page(userId?: string, category?: string, name?: string, properties?: Properties): void {
    throw new Error('Error in page().');
  }

  postPage(
    userId: string | undefined,
    category: string | undefined,
    name: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    throw new Error('Error in postPage().');
  }

  track(userId: string | undefined, event: Event): void {
    throw new Error('Error in track().');
  }

  postTrack(userId: string | undefined, event: Event, validationResponses: ValidationResponse[]): void {
    throw new Error('Error in postTrack().');
  }

  reset(): void {
    throw new Error('Error in reset().');
  }
}
