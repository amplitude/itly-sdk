# mParticle React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/iterativelyhq/itly-sdk/blob/master/README.md)

## Installation

[mParticle library](https://docs.mparticle.com/developers/sdk/react-native/getting-started/)

`yarn add react-native-mparticle`

mParticle Iteratively plugin

`yarn add @itly/plugin-mparticle-react-native`

## Initialization

[Setup for iOS and tvOS](https://docs.mparticle.com/developers/sdk/react-native/getting-started/#ios-and-tvos)

[Setup for Android](https://docs.mparticle.com/developers/sdk/react-native/getting-started/#android)

```
import MparticlePlugin from '@itly/plugin-mparticle-react-native';

itly.load({
  ...
  plugins: [
    ...
    new MparticlePlugin(),
  ],
  ...
});
```

## Linking

If you are using an older version of React Native that doesn't support auto-linking you may need to follow additional setup steps.

Read full setup instructions for [mParticle SDK](https://docs.mparticle.com/developers/sdk/react-native/getting-started/) for more information.
