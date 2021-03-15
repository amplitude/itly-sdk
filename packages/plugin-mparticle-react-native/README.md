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
    ...
  ],
  ...
});
```
