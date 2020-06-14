# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)


### Bug Fixes

* updated sdk-core to always validate context properties ([b678990](https://github.com/iterativelyhq/itly-sdk/commit/b6789909834cb9939289e3c98fb4b202119eb7ed))





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package root





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* cleaned up plugin-amplitude tests and added coverage ([82f4b2a](https://github.com/iterativelyhq/itly-sdk/commit/82f4b2a1cef22b6c1b5b9d8c644902695e5a2582))
* made plugin-mixpanel-node MixpanelOptions optional ([59650f4](https://github.com/iterativelyhq/itly-sdk/commit/59650f405ec0cf2a223d9deafc8dde83066af438))
* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* removed unecessary second build in CI ([0110793](https://github.com/iterativelyhq/itly-sdk/commit/01107936eed37d3bfbcab8cd2d1501d112256a89))
* renamed 'writeKey' in Segment plugins ([57c9137](https://github.com/iterativelyhq/itly-sdk/commit/57c9137d4bbeac4c89a3dd0f6faa7150fe4fe3b2))
* set defaults for ItlyOptions before load(options) callbacks ([066b59b](https://github.com/iterativelyhq/itly-sdk/commit/066b59bf1aaf208f05f800b89e95bb9687361910))
* updated CI workflow to run tests against built packages ([f650c33](https://github.com/iterativelyhq/itly-sdk/commit/f650c33a1cffe0ad56d1ef37ec1a99622e4aa1c0))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

* add test code coverage for @itly/sdk ([69a9374](https://github.com/iterativelyhq/itly-sdk/commit/69a93749b46d44dd4d871ffb7ea9c6301b59dac6))
* added debugger plugin, draft for browser ([c013b5f](https://github.com/iterativelyhq/itly-sdk/commit/c013b5f6ee92d6eddae2e9d48fb2793b569136d4))
* added debugger-node plugin, draft for nodejs (requires node-fetch) ([655e02b](https://github.com/iterativelyhq/itly-sdk/commit/655e02bf75393bf057f27c88fd624eead7edc8fd))
* added test code coverage for sdk-core ([4587a43](https://github.com/iterativelyhq/itly-sdk/commit/4587a43e4aa36a5143e306283537b1f343aca7e9))
* added tests for plugin-ampltude ([13cbbf8](https://github.com/iterativelyhq/itly-sdk/commit/13cbbf8ec7c573e4d2007eead6ad18c232884522))





## [0.7.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.0...v0.7.1) (2020-06-12)


### Bug Fixes

* context properties are now included on all track() events ([5552ea2](https://github.com/iterativelyhq/itly-sdk/commit/5552ea27aea23e0dce26477da91467bf15cddaf5))





# [0.7.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.1...v0.7.0) (2020-06-11)


### Features

* added ValidationOptions.errorOnInvalid ([5e4914b](https://github.com/iterativelyhq/itly-sdk/commit/5e4914b07949686838d2b0af2fb70ede03ed07ec))
* plugin-schema-validator now uses event.name as default schema key ([4c14829](https://github.com/iterativelyhq/itly-sdk/commit/4c148290eb2a4fb98bc84a1be85eafd9d26982d4))





## [0.6.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.0...v0.6.1) (2020-06-09)


### Bug Fixes

* made ItlyEvent properties optional ([5193738](https://github.com/iterativelyhq/itly-sdk/commit/5193738efcc87aa2236d6dbf6dce1f0c14af61c7))
* updated SnowplowOptions to be manditory and include config ([e1f4caa](https://github.com/iterativelyhq/itly-sdk/commit/e1f4caa1234715ffad5e12bc7711654f8e46f791))





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)


### Features

* added plugin-amplitude for browser integration ([78ef65e](https://github.com/iterativelyhq/itly-sdk/commit/78ef65e56095734f97b935defb001cea0ee8807d))
* added plugin-mixpanel for browser integration ([d32a506](https://github.com/iterativelyhq/itly-sdk/commit/d32a5064bb9723f5896cf28d5832a5d8766557c8))
* added plugin-segment for browser integration ([839b7d3](https://github.com/iterativelyhq/itly-sdk/commit/839b7d3a6cdf11fc54089d68e2acd9301ec23bd9))
* added plugin-snowplow for browser integration ([3c1abea](https://github.com/iterativelyhq/itly-sdk/commit/3c1abea38d8943e59415193269099c307b001165))





# [0.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.4.0...v0.5.0) (2020-06-09)


### Bug Fixes

* added getPlugin(id: string) to sdk-core and sdk-node ([7e4c82f](https://github.com/iterativelyhq/itly-sdk/commit/7e4c82f115292f6e246200401c61952a87be8168))
* removed ItlyOptions from plugin-amplitude-node ([f00bd64](https://github.com/iterativelyhq/itly-sdk/commit/f00bd64ad3df84c8af1bb4a72980d557c2b2daeb))
* removed ItlyOptions from plugin-mixpanel-node ([8486da4](https://github.com/iterativelyhq/itly-sdk/commit/8486da4e800dc380b88c524274ed8928ba578da0))
* removed ItlyOptions from plugin-segment-node ([93e412f](https://github.com/iterativelyhq/itly-sdk/commit/93e412f5e58276e692264386c5cc6345d3f6813f))


### Features

* added browser SDK module @itly/sdk ([00a87af](https://github.com/iterativelyhq/itly-sdk/commit/00a87afe46194eed936b23b6fedf00eea786b1e2))
* added ItlyOptions.validationOptions ([7e3bc99](https://github.com/iterativelyhq/itly-sdk/commit/7e3bc998f8a7e1de36bd37a1e3d6cefcf72a6239))
* added optional validationErrorHandler to SchemaValidator ([a35b68a](https://github.com/iterativelyhq/itly-sdk/commit/a35b68acc545d25f50f8447513a70293a4c48050))





# [0.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.3.0...v0.4.0) (2020-06-06)


### Features

* added plugin-mixpanel-node ([c9e2525](https://github.com/iterativelyhq/itly-sdk/commit/c9e2525aa76142b66ef2422754f789251302bf1c))





# [0.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.2.0...v0.3.0) (2020-06-05)


### Features

* renamed @itly/plugin-schema-validator ([e54ec8a](https://github.com/iterativelyhq/itly-sdk/commit/e54ec8a5b2fb20b8c06aab8db356d002d57c40c5))





# [0.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v0.2.0) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* added changelog script ([5783bf9](https://github.com/iterativelyhq/itly-sdk/commit/5783bf93b6c7485c36842f3470d3535c5c80168c))
* Added pre-commit linting with husky ([312e50b](https://github.com/iterativelyhq/itly-sdk/commit/312e50bb779b59daa0e066f87ef8a287ede903ea))
* Renamed plugin-amplitude-node ([2f1b33f](https://github.com/iterativelyhq/itly-sdk/commit/2f1b33f0b012f0968e8f9f812ec2768a812d2978))
* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture





# [](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* Added pre-commit linting with husky ([312e50b](https://github.com/iterativelyhq/itly-sdk/commit/312e50bb779b59daa0e066f87ef8a287ede903ea))
* Renamed plugin-amplitude-node ([2f1b33f](https://github.com/iterativelyhq/itly-sdk/commit/2f1b33f0b012f0968e8f9f812ec2768a812d2978))
* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture



## [0.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.0...v0.1.1) (2020-06-02)



# [0.1.0](https://github.com/iterativelyhq/itly-sdk/compare/79d864d389e5424d0999d0c1105dbdfc4c5f955d...v0.1.0) (2020-06-02)


### Features

* Initial commit. sdk-core, sdk-node, and node-plugin-amplitude modules ([79d864d](https://github.com/iterativelyhq/itly-sdk/commit/79d864d389e5424d0999d0c1105dbdfc4c5f955d))
