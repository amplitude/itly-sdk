# Segment React Native Plugin for Iteratively SDK

[Iteratively SDK](https://github.com/iterativelyhq/itly-sdk/blob/master/README.md)

## Installation

[Segment library](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/#getting-started)

`yarn add @segment/analytics-react-native`

Segment Iteratively plugin

`yarn add @itly/plugin-segment-react-native`

## Initialization

```
import SegmentPlugin from '@itly/plugin-segment-react-native';
itly.load({
  ...
  plugins: [
    ...
    new SegmentPlugin('my-write-key'),
  ],
  ...
});
```
