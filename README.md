# Iteratively SDK
Track and validate analytics with a unified, extensible interface that works with all your 3rd party analytics providers.

The Iteratively SDK and plugins for Javascript and Typescript make it easy to support analytics providers such as Amplitude, Mixpanel, Segment, Snowplow, etc. Use an existing plugin or implement your own!

The SDK also supports event validation. For JSON schema validation see `@itly/plugin-schema-validator`.

# Overview
* [Modules](#modules)
  * [Core](#isomorphic-browser-and-node)
  * [Browser](#browser-plugins)
  * [Node](#node-plugins)
* [Usage](#setup)
  * [Browser](#browser)
  * [Node](#node)
  * [Differences between Browser and Node](#differences-between-browser-and-node)
  * [SDK Types for TypeScript](#sdk-types-for-typescript)
  * [Event Validation](#event-validation)
* [Create a Plugin](#create-an-itly-plugin)
* [Contributing](#contributing)
  * [Working with the project](#working-with-the-project)
    + [Setup](#setup-1)
    + [Build](#build)
    + [Lint](#lint)
    + [Test](#test)
    + [Release](#release)
  * [Add plugin modules](#creating-plugin-modules)
  * [Commits](#commits)

# Modules
All modules are JS/TS compatible but some plugins are divided by platform (browser vs server).

#### Isomorphic (Browser and Node)
  * `@itly/sdk`
  * `@itly/plugin-schema-validator`
#### Browser Plugins 
  * `@itly/plugin-amplitude` 
  * `@itly/plugin-mixpanel`
  * `@itly/plugin-segment`
  * `@itly/plugin-snowplow`
  * `@itly/plugin-iteratively`
#### Node Plugins
  * `@itly/plugin-amplitude-node` 
  * `@itly/plugin-mixpanel-node`
  * `@itly/plugin-segment-node`
  * `@itly/plugin-iteratively-node` 

# Usage
## Browser
1. Add `@itly/sdk` and browser plugins to your project:
    ```
    $ yarn add @itly/sdk
    $ yarn add @itly/plugin-amplitude @itly/plugin-mixpanel @itly/plugin-segment
    ```
2. Import `itly` and plugins, `load()` configuration, and start `track()`ing.
    ```
    import { Itly } from '@itly/sdk';
    import { AmplitudePlugin } from '@itly/plugin-amplitude';
    import { MixpanelPlugin } from '@itly/plugin-mixpanel';
    import { SegmentPlugin } from '@itly/plugin-segment';

    const itly = new Itly();
    itly.load({
      context: { someGlobalValue: 'On all events' },     
      options: {
        environment: 'production',
        plugins: [
          new AmplitudePlugin('AMPLITUDE-KEY'),
          new MixpanelPlugin('MIXPANEL-KEY'),
          new SegmentPlugin('SEGMENT-KEY'),
        ],
      },
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
## Node
1. Add `@itly/sdk` and Node specific plugins to your project:
    ```
    $ yarn add @itly/sdk
    $ yarn add @itly/plugin-amplitude-node @itly/plugin-mixpanel-node @itly/plugin-segment-node
    ```
2. Import `itly` and plugins, `load()` configuration, and start `track()`ing.
    ```
    import { Itly } from '@itly/sdk';
    import { AmplitudePlugin } from '@itly/plugin-amplitude-node';
    import { MixpanelPlugin } from '@itly/plugin-mixpanel-node';
    import { SegmentPlugin } from '@itly/plugin-segment-node';

    const itly = new Itly();
    itly.load({
      context: { someGlobalValue: 'On all events' },
      options: {
        environment: 'production',
        plugins: [
          new AmplitudePlugin('AMPLITUDE-KEY'),
          new MixpanelPlugin('MIXPANEL-KEY'),
          new SegmentPlugin('SEGMENT-KEY'),
        ],
      },
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
## Differences between Browser and Node
The `@itly/sdk` has slightly different interfaces for Browser and Node.

The Browser is single-tenant and requires a User ID only on `identify` and `alias`.
  
Node is multi-tenant and requires a User ID on all SDK methods including `group` and `track`.

The Plugin interface is the same on both platforms and has an (optional) User ID on all callbacks.

## SDK Types for TypeScript
The `@itly/sdk` is isomorphic and automatically provides the implementation for your specific platform. As a result the
 following works great in JavaScript for both the browser and Node.js.
```
// Untyped Itly SDK for your platform
import { Itly } from '@itly/sdk';
```
    
Unfortunately in TypeScript this import is of type `any`. If you would like a strongly typed object you need to specify 
the platform as well.
```
// Strongly typed Browser SDK
import { Itly } from '@itly/sdk/browser';
```
```
// Strongly typed Node SDK
import { Itly } from '@itly/sdk/node';
```

# Event Validation
1. Add `@itly/plugin-schema-validator` to your project.
    ```
    $ yarn add @itly/plugin-schema-validator
    ```
2. Import and setup `SchemaValidatorPlugin`, add it to the `load()`ed `plugins`. Now all `track()`ed event's will be validated against their schema.
    ```
    import { Itly } from '@itly/sdk';
    import { SchemaValidatorPlugin } from '@itly/plugin-schema-validator';

    const itly = new Itly();
    itly.load({
      options: {
        validation: {
          disabled: false,
          trackInvalid: false,
          errorOnInvalid: false,
        },
        plugins: [
          new SchemaValidatorPlugin(
            {
              'My Event': {"type":"object","properties":{"numToValidate":{"type":"integer","maximum":10}},"additionalProperties":false,"required":["propToValidate"]},
              'Another event for something': {...},
            },
          ),
        ],
      },
    });

    // Validates and tracks
    itly.track({ name: 'My Event', properties: { numToValidate: 5 }});

    // Validation error on Event data that doesn't match schema
    itly.track({ name: 'My Event', properties: {}});
    itly.track({ name: 'My Event', properties: { numToValidate: 20 }});
    itly.track({ name: 'My Event', properties: { unsupportedProp: 'will cause error' }});

    // Validation error for Event missing schema
    itly.track({ name: 'No schema' });
    ```

# Create an Itly Plugin
1. Extend the `Plugin` class and override some or all of the lifecycle hooks. Alternatively you can implement the full `Plugin` interface.
    ```
    import itly, {
      Event, Options, Properties, Plugin, Properties, ValidationResponse,
    } from '@itly/sdk';

    class CustomPlugin extends Plugin {
      constructor() {
        super('custom');
      }

      load(options: PluginLoadOptions): void {...}

      alias(userId: string, previousId?: string): void {...}

      group(userId: string | undefined, groupId: string, properties?: Properties): void {...}

      identify(userId?: string, properties?: Properties): void {...}

      page(userId?: string, category?: string, name?: string, properties?: Properties): void {...}

      reset(): void {...}

      flush(): void {...}

      track(userId: string | undefined, event: ItlyEvent): void {...}

      validate(event: Event): ValidationResponse {...}
    }
    ```
2. Add your Plugin to `plugins` during `itly.load()`.
    ```
    itly.load({
      options: {
        plugins: [new CustomPlugin()],
      },
    });
    ```
# Contributing

## Working with the project
This project uses [Lerna](https://github.com/lerna/lerna) to manage multiple modules.

[`package.json`](package.json) includes `bootstrap`, `build`, `lint`, `test`, and `release` scripts that call the necessary `lerna` commands.


1. ### Setup

    Before building the first time, and any time you add a new module, you need to run `yarn setup`.
    This will install dependencies, create symlinks for the local modules, and allow you to develop against the local copy of the `@itly` modules rather than having to publish new versions for each change.
    ```
    $ yarn setup
    ```

2. ### Build

    If you have already run `setup` you can use `build` to compile all modules.
    ```
    $ yarn build
    ```

3. ### Lint

    ```
    $ yarn lint
    ```

4. ### Test

    By default tests will run against the source files
    ```
    $ yarn test
    ```
    Built distributions can be tested as well
    ```
    $ yarn test:build
    ```

5. ### Release

    Authenticate with the registry, then run the `release` script to update the module versions, changelog, and publish them to Gemfury.
    ```
    $ npm login --registry=https://npm.fury.io/itly
    $ yarn release
    ```

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
    ✔ Itly SDK version? · ^2.0.0

    Loaded templates: _templates
      added: packages/plugin-awesome-analytics/.npmignore
      added: packages/plugin-awesome-analytics/lib/index.ts
      added: packages/plugin-awesome-analytics/package.json
      added: packages/plugin-awesome-analytics/tsconfig.json
    ```

3. Extend the Itly `Plugin` class in `packages/<name>/lib/index.ts`
    ```
    $ open packages/plugin-awesome-analytics/lib/index.ts
    ```

## Commits
itly-sdk uses [convential commits](https://www.conventionalcommits.org/), a structured commit message format, to make managing our releases easier and provide better documentation. Commit messages are restricted to conventional commits format via [husky](https://www.npmjs.com/package/husky).

Thanks for your contributions!
