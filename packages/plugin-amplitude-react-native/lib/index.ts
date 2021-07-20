/* eslint-disable no-unused-vars, class-methods-use-this */
import {
  Event,
  Properties,
  RequestLoggerPlugin,
  PluginLoadOptions,
  PluginCallOptions,
} from '@amplitude/sdk';
import { Amplitude } from '@amplitude/react-native';

export type AmplitudeOptions = { };
export type AmplitudeResponse = boolean;
export type AmplitudeCallback = (response: AmplitudeResponse) => void;

export interface AmplitudeCallOptions extends PluginCallOptions {}
export interface AmplitudeAliasOptions extends AmplitudeCallOptions {}
export interface AmplitudeIdentifyOptions extends AmplitudeCallOptions {
  callback?: AmplitudeCallback;
}
export interface AmplitudeGroupOptions extends AmplitudeCallOptions {}
export interface AmplitudePageOptions extends AmplitudeCallOptions {}
export interface AmplitudeTrackOptions extends AmplitudeCallOptions {
  callback?: AmplitudeCallback;
}

/**
 * Amplitude React Native Plugin for Iteratively SDK
 */
export class AmplitudePlugin extends RequestLoggerPlugin {
  private amplitude: Amplitude | undefined;

  private initializePromise: Promise<boolean> | undefined;

  constructor(
    private apiKey: string,
    private options?: AmplitudeOptions,
  ) {
    super('amplitude');
  }

  async load(options: PluginLoadOptions) {
    super.load(options);
    this.amplitude = this.createAmplitude();
    this.initializePromise = this.amplitude.init(this.apiKey);
    await this.initializePromise;
  }

  createAmplitude(): Amplitude {
    return Amplitude.getInstance();
  }

  async identify(userId: string | undefined, properties?: Properties, options?: AmplitudeIdentifyOptions) {
    await this.initializePromise!;

    if (userId) {
      await this.amplitude!.setUserId(userId);
    }

    if (properties) {
      const { callback } = options ?? {};
      const responseLogger = this.logger!.logRequest('identify', `${userId} ${JSON.stringify(properties)}`);
      try {
        const response = await this.amplitude!.setUserProperties(properties);
        responseLogger.success(JSON.stringify(response));
        callback?.(response);
      } catch (e) {
        responseLogger.error(e.toString());
      }
    }
  }

  async track(userId: string, { name, properties }: Event, options?: AmplitudeTrackOptions) {
    await this.initializePromise!;

    const { callback } = options ?? {};
    const responseLogger = this.logger!.logRequest('track', JSON.stringify({ name, properties }));
    try {
      const response = await this.amplitude!.logEvent(name, properties);
      responseLogger.success(JSON.stringify(response));
      callback?.(response);
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async reset() {
    await this.initializePromise!;

    await this.amplitude!.setUserId(null);
    await this.amplitude!.regenerateDeviceId();
  }

  async flush() {
    await this.initializePromise!;

    await this.amplitude!.uploadEvents();
  }
}

export default AmplitudePlugin;
