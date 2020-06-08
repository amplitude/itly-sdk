# itly-sdk
Iteratively analytics SDKs and plugins for Javascript and Typescript

# Installation
1. Update your .npmrc to use our Gemfury registry for @itly modules:
    ```
    @itly:registry=https://npm.fury.io/itly/
    //npm.fury.io/itly/:_authToken=2irLyg-8E37HWhKmt5giYVH2ziVuC2pCQ
    ```
    Bash one liner to update `.npmrc`:
    ```
    $ echo "@itly:registry=https://npm.fury.io/itly/\n//npm.fury.io/itly/:_authToken=2irLyg-8E37HWhKmt5giYVH2ziVuC2pCQ" >> .npmrc
    ```

2. Add Itly SDK and plugins to your project:
    ```
    $ yarn add @itly/sdk-node
    $ yarn add @itly/plugin-amplitude-node @itly/plugin-mixpanel-node @itly/plugin-segment-node
    ```
3. Use the Itly SDK
    ```
    import itly from '@itly/sdk-node';
    import AmplitudePlugin, { AmplitudeOptions } from '@itly/plugin-amplitude-node';
    import MixpanelPlugin, { MixpanelOptions } from '@itly/plugin-mixpanel-node';
    import SegmentPlugin, { SegmentOptions } from '@itly/plugin-segment-node';

    itly.load({
      context: {
        someGlobalValue: 'On all events',
      },
      plugins: [
        // NOTICE: itlyOptions to be removed from plugin constructors
        // NOTICE: Instead use the ItlyPlugin.load(options) hook
        new AmplitudePlugin(itlyOptions, 'AMPLITUDE-KEY', { ...amplitudeOptions }),
        new MixpanelPlugin(itlyOptions, 'MIXPANEL-KEY', { ...mixpanelOptions }),
        new SegmentPlugin(itlyOptions, 'SEGMENT-KEY', { ...segmentOptions }),
      ],
    });

    const userId = 'some-user';

    itly.identify('anon', { userProp: 1 }));
    itly.alias(userId, 'anon');
    itly.group(userId, 'my-group', { groupProp: 'anything' });

    itly.track(userId, {
      name: 'My Event',
      properties: {
        'a-property': 'a value'
        someNum: 42,
        awesome: true,
      },
    });
    ```
3. Add Schema validation plugin
    ```
    $ yarn add @itly/plugin-schema-validator
    ```
    Load `@itly/plugin-schema-validator` and start tracking with validation
    ```
    import itly, { ItlyPluginBase, ItlyEvent, ItlyProperties, ValidationResponse } from '@itly/sdk-node';
    import SchemaValidator from '@itly/plugin-schema-validator';

    // TODO: Add validationError handler in SchemaValidator constructor so this class isn't necessary
    class ValidationErrorHandler extends ItlyPluginBase {
      validationError(validation: ValidationResponse, event: ItlyEvent) {
          console.log('A validation error occured.', validation.message);
      }
    }

    itly.load({
      plugins: [
        new SchemaValidator({
          'Event name': {...eventSchema},
          'Another event for something': {...eventSchema},
        }),
        // See TODO above, move to SchemaValidator constructor
        new ValidationErrorHandler(),
        ...
      ],
    });

    itly.track(userId, {
      name: 'Event name',
      properties: {
          'a-property-to-validate': 'a value checked against schema',
      },
    });
    ```
4. Create your own plugin
    ```
    import itly, { ItlyPluginBase, ItlyEvent, ItlyProperties, ValidationResponse } from '@itly/sdk-node';

    class CustomPlugin extends ItlyPluginBase {
      id = () => 'custom';

      load(): void {...}

      alias(userId: string, previousId?: string): void {...}

      group(userId: string | undefined, groupId: string, properties?: ItlyProperties): void {...}

      identify(userId: string | undefined, properties?: ItlyProperties): void {...}

      page(userId: string | undefined, category: string | undefined, name: string | undefined, properties?: ItlyProperties): void {...}

      reset(): void {...}

      track(userId: string | undefined, event: ItlyEvent): void {...}

      validationError(validation: ValidationResponse, event: ItlyEvent): void {...}
    }
    ```
    Add to load options:
    ```
    itly.load({
      plugins: [new CustomPlugin()],
    });
    ```
# Contributing

## Creating plugins
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