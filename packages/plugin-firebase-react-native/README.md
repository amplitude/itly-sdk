# Firebase React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/iterativelyhq/itly-sdk/blob/master/README.md)

## Installation

[Firebase library](https://rnfirebase.io/#installation)

[Firebase Analytics library](https://rnfirebase.io/analytics/usage#installation)

```
# Install the app module
yarn add @react-native-firebase/app

# Install the analytics module
yarn add @react-native-firebase/analytics

# If you're developing your app using iOS, run this command
cd ios/ && pod install
```

[Firebase Android Setup](https://rnfirebase.io/#2-android-setup)

[Firebase iOS Setup](https://rnfirebase.io/#3-ios-setup)

Firebase Iteratively plugin

`yarn add @itly/plugin-firebase-react-native`

## Initialization

```
import FirebasePlugin from '@itly/plugin-firebase-react-native';

itly.load({
  ...
  plugins: [
    ...
    new FirebasePlugin(),
  ],
  ...
});
```

## Linking

If you are using an older version of React Native that doesn't support auto-linking you may need to follow additional setup steps.

Read full setup instructions for [Firebase SDK](https://rnfirebase.io/#4-autolinking--rebuilding) for more information.
