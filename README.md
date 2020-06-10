# @itly/sdk-modules
Track and validate analytics with a unified, extensible interface that works with all your 3rd party analytics providers.

The Iteratively SDK and plugins for Javascript and Typescript make it easy to support analytics providers such as Amplitude, Mixpanel, Segment, Snowplow, etc. Use an existing plugin or implement your own!

The SDK also supports event validation. For JSON schema validation see `@itly/plugin-schema-validator`.

## Modules:
All modules are JS/TS compatiable but divided by platform (browser vs server).

* Browser
  * `@itly/sdk`
  * `@itly/plugin-amplitude` 
  * `@itly/plugin-mixpanel`
  * `@itly/plugin-segment`
  * `@itly/plugin-snowplow`
* Node
  * `@itly/sdk-node`
  * `@itly/plugin-amplitude-node` 
  * `@itly/plugin-mixpanel-node`
  * `@itly/plugin-segment-node`
* Core
  * `@itly/sdk-core`
  * `@itly/plugin-schema-validator`

# Setup
1. Update your `.npmrc` to use our Gemfury registry for `@itly` modules:
    ```
    @itly:registry=https://npm.fury.io/itly/
    //npm.fury.io/itly/:_authToken=2irLyg-8E37HWhKmt5giYVH2ziVuC2pCQ
    ```
    Bash one liner to update `.npmrc`:
    ```
    $ echo "@itly:registry=https://npm.fury.io/itly/\n//npm.fury.io/itly/:_authToken=2irLyg-8E37HWhKmt5giYVH2ziVuC2pCQ" >> .npmrc
    ```

# Browser
1. Add `@itly/sdk` (Itly *Browser* SDK) and plugins to your project:
    ```
    $ yarn add @itly/sdk
    $ yarn add @itly/plugin-amplitude @itly/plugin-mixpanel @itly/plugin-segment
    ```
2. Import `itly` and plugins, `load()` configuration, and start `track()`ing.
    ```
    import itly from '@itly/sdk';
    import AmplitudePlugin from '@itly/plugin-amplitude';
    import MixpanelPlugin from '@itly/plugin-mixpanel';
    import SegmentPlugin from '@itly/plugin-segment';

    itly.load({
      environment: 'production',
      context: {
        someGlobalValue: 'On all events',
      },
      plugins: [
        new AmplitudePlugin('AMPLITUDE-KEY'),
        new MixpanelPlugin('MIXPANEL-KEY'),
        new SegmentPlugin('SEGMENT-KEY'),
      ],
    });

    itly.identify('anon', { userProp: 1 });
    itly.alias('some-user', 'anon');
    itly.group('my-group', { groupProp: 'anything' });

    itly.track({
      name: 'My Event',
      properties: {
        'a-property': 'a value',
        someNum: 42,
        awesome: true,
      },
    });
    ```
# Node
2. Add `@itly/sdk-node` (Itly *Node* SDK) and plugins to your project:
    ```
    $ yarn add @itly/sdk-node
    $ yarn add @itly/plugin-amplitude-node @itly/plugin-mixpanel-node @itly/plugin-segment-node
    ```
3. Import `itly` and plugins, `load()` configuration, and start `track()`ing.
    ```
    import itly from '@itly/sdk-node';
    import AmplitudePlugin from '@itly/plugin-amplitude-node';
    import MixpanelPlugin from '@itly/plugin-mixpanel-node';
    import SegmentPlugin from '@itly/plugin-segment-node';

    itly.load({
      environment: 'production',
      context: {
        someGlobalValue: 'On all events',
      },
      plugins: [
        new AmplitudePlugin('AMPLITUDE-KEY'),
        new MixpanelPlugin('MIXPANEL-KEY'),
        new SegmentPlugin('SEGMENT-KEY'),
      ],
    });

    const userId = 'some-user';

    itly.identify('anon', { userProp: 1 });
    itly.alias(userId, 'anon');
    itly.group(userId, 'my-group', { groupProp: 'anything' });

    itly.track(userId, {
      name: 'My Event',
      properties: {
        'a-property': 'a value',
        someNum: 42,
        awesome: true,
      },
    });
    ```

# Event Validation
1. Add `@itly/plugin-schema-validator` to your project. This plugin works for both `@itly/sdk` and `@itly/sdk-node`.
    ```
    $ yarn add @itly/plugin-schema-validator
    ```
2. Import and setup `SchemaValidatorPlugin`, add it to the `load()`ed `plugins`. Now all `track()`ed event's will be validated against their schema. Validation handling can be configured via `ItlyOptions.validationOptions`.
    ```
    import itly from '@itly/sdk';
    import SchemaValidatorPlugin from '@itly/plugin-schema-validator';

    itly.load({
      validationOptions: {
        disabled: false,
        trackInvalid: false,
      },
      plugins: [
        new SchemaValidatorPlugin(
          {
            'Event name': {...eventSchema},
            'Another event for something': {...eventSchema},
          },
          (validation, event, schema) => console.log(
            `Validation Error! event='${event.name}' message='${validation.message}'`,
          );
        ),
      ],
    });

    itly.track({
      name: 'Event name',
      properties: {
          'a-property-to-validate': 'a value checked against schema',
      },
    });
    ```

# Create an Itly Plugin
1. Extend the `ItlyPluginBase` class and overide the lifecycle hooks you are interested in. Alternatively you can choose to implement the full `ItlyPlugin` interface.
    ```
    import itly, {
      ItlyPluginBase, ItlyEvent, ItlyProperties, ValidationResponse,
    } from '@itly/sdk-node';

    class CustomPlugin extends ItlyPluginBase {
      id = () => 'custom';

      load(options: ItlyOptions): void {...}

      alias(userId: string, previousId?: string): void {...}

      group(userId: string | undefined, groupId: string, properties?: ItlyProperties): void {...}

      identify(userId?: string, properties?: ItlyProperties): void {...}

      page(userId?: string, category?: string, name?: string, properties?: ItlyProperties): void {...}

      reset(): void {...}

      track(userId: string | undefined, event: ItlyEvent): void {...}

      validationError(validation: ValidationResponse, event: ItlyEvent): void {...}

      validate(event: ItlyEvent): ValidationResponse {...}
    }
    ```
2. Add your Plugin to `plugins` during `itly.load()`.
    ```
    itly.load({
      plugins: [new CustomPlugin()],
    });
    ```
# Contributing

## Creating plugin modules
There are [hygen](https://github.com/jondot/hygen) templates for creating a new plugin.

`hygen plugin new <name>` will create a new plugin module.

1. Install hygen
    ```
    $ brew tap jondot/tap
    $ brew install hygen
    ```

2. Generate new plugin with `hygen plugin new <name>`. You will be prompted to set the author, base SDK(@itly/sdk, @itly/sdk-node), and SDK version range for the new plugin.
    ```
    ~/itly-sdk $ hygen plugin new awesome-analytics

    ✔ Author? · Iteratively
    ✔ Itly SDK? · @itly/sdk
    ✔ Itly SDK version? · ^0.1.2

    Loaded templates: _templates
      added: packages/plugin-awesome-analytics/.npmignore
      added: packages/plugin-awesome-analytics/lib/index.ts
      added: packages/plugin-awesome-analytics/package.json
      added: packages/plugin-awesome-analytics/tsconfig.json
    ```

3. Extend the ItlyPluginBase class in `packages/<name>/lib/index.ts`
    ```
    $ open packages/plugin-awesome-analytics/lib/index.ts
    ```

## Commits
itly-sdk uses [convential commits](https://www.conventionalcommits.org/), a structured commit message format, to make managing our releases easier and provide better documentation. Commit messages are restricted to conventional commits format via [husky](https://www.npmjs.com/package/husky).

Thanks for your contributions!