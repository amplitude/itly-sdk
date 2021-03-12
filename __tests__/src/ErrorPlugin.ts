/* eslint-disable class-methods-use-this, no-unused-vars, import/no-unresolved, import/extensions */
import {
  PluginLoadOptions, Event, Properties, Plugin, ValidationResponse,
} from '../../packages/sdk';

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

  async alias(userId: string, previousId: string | undefined) {
    throw new Error('Error in alias().');
  }

  async identify(userId: string | undefined, properties: Properties | undefined) {
    throw new Error('Error in identify().');
  }

  postIdentify(
    userId: string | undefined,
    properties: Properties | undefined,
    validationResponses: ValidationResponse[],
  ): void {
    throw new Error('Error in postIdentify().');
  }

  async group(userId: string | undefined, groupId: string, properties: Properties | undefined) {
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

  async page(userId?: string, category?: string, name?: string, properties?: Properties) {
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

  async track(userId: string | undefined, event: Event) {
    throw new Error('Error in track().');
  }

  postTrack(userId: string | undefined, event: Event, validationResponses: ValidationResponse[]): void {
    throw new Error('Error in postTrack().');
  }

  reset(): void {
    throw new Error('Error in reset().');
  }

  async flush() {
    throw new Error('Error in flush().');
  }
}
