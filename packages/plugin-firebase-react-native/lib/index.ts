/* eslint-disable no-unused-vars, class-methods-use-this */
import analytics from '@react-native-firebase/analytics';
import {
  Event, Properties, RequestLoggerPlugin,
} from '@amplitude/sdk';

export type FirebaseOptions = {}

/**
 * Firebase React Native Plugin for Iteratively SDK
 */
export class FirebasePlugin extends RequestLoggerPlugin {
  constructor(
    private readonly options?: FirebaseOptions,
  ) {
    super('firebase');
  }

  async identify(userId: string | undefined, properties?: Properties) {
    const responseLogger = this.logger!.logRequest('identify', `${userId}, ${JSON.stringify(properties)}`);
    try {
      if (userId) {
        await analytics().setUserId(userId);
      }
      if (properties != null) {
        const identifyProperties = Object.fromEntries(
          Object.entries(properties).map(([key, value]) =>
            [key, (value == null || typeof value === 'string') ? value : JSON.stringify(value)]),
        );
        await analytics().setUserProperties(identifyProperties);
      }
      responseLogger.success('done');
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async page(userId?: string, category?: string, name?: string, properties?: Properties) {
    const responseLogger = this.logger!.logRequest('page', `${userId}, ${category}, ${name}, ${JSON.stringify(properties)}`);
    try {
      if (userId) {
        await analytics().setUserId(userId);
      }
      await analytics().logScreenView({
        screen_class: category,
        screen_name: name,
      });
      responseLogger.success('done');
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async track(userId: string | undefined, { name, properties }: Event) {
    const responseLogger = this.logger!.logRequest('track', `${userId}, ${name}, ${JSON.stringify(properties)}`);
    try {
      if (userId) {
        await analytics().setUserId(userId);
      }
      await analytics().logEvent(
        name,
        properties,
      );
      responseLogger.success('done');
    } catch (e) {
      responseLogger.error(e.toString());
    }
  }

  async reset() {
    await analytics().setUserId(null);
  }
}

export default FirebasePlugin;
