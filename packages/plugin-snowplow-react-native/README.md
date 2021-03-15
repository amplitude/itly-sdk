# Snowplow React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/iterativelyhq/itly-sdk/blob/master/README.md)

## Installation

[Snowplow library](https://docs.snowplowanalytics.com/docs/collecting-data/collecting-from-own-applications/react-native-tracker/#installation)

`yarn add @snowplow/react-native-tracker`

Snowplow Iteratively plugin

`yarn add @itly/plugin-snowplow-react-native`

## Initialization

```
import SnowplowPlugin from '@itly/plugin-snowplow-react-native';

itly.load({
  ...
  plugins: [
    ...
    new SnowplowPlugin(
      'my-vendor',
      {
        endpoint: 'my-endpoint',
        namespace: 'my-namespace',
        appId: 'my-appid',
      },
    ),
    ...
  ],
  ...
});
```
