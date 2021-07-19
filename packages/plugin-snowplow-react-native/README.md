# Snowplow React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/amplitude/itly-sdk/blob/master/README.md)

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
  ],
  ...
});
```

## Linking

If you are using an older version of React Native that doesn't support auto-linking you may need to follow additional setup steps.

Read full setup instructions for [Snowplow SDK](https://github.com/snowplow-incubator/snowplow-react-native-tracker#getting-started) for more information.
