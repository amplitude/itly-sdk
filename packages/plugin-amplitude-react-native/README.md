# Amplitude React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/iterativelyhq/itly-sdk/blob/master/README.md)

## Installation

### [Amplitude library](https://developers.amplitude.com/docs/react-native-setup)

`yarn add @amplitude/react-native@latest`

####iOS Installation

`cd /ios && pod install`

### Amplitude Iteratively plugin

`yarn add @itly/plugin-amplitude-react-native`

## Initialization

```
import AmplitudePlugin from '@itly/plugin-amplitude-react-native';
itly.load({
  ...
  plugins: [
    ...
    new AmplitudePlugin('my-write-key'),
  ],
  ...
});
```

## Linking

If you are using an older version of React Native that doesn't support auto-linking you may need to follow additional setup steps.

Read full setup instructions for [Amplitude SDK](https://developers.amplitude.com/docs/react-native-setup) for more information.
