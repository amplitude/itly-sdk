# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)


### Bug Fixes

* incorporated CR feedback ([ba51695](https://github.com/iterativelyhq/itly-sdk/commit/ba5169552072beeca9e9f268f028cfac71ae67b1))
* make SDK merge context to an event without losing its type ([65d7c72](https://github.com/iterativelyhq/itly-sdk/commit/65d7c72d044dc4bf892041da40a9b123885fb3be))





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)


### Bug Fixes

* fixed linter error & CR feedback ([b3ca320](https://github.com/iterativelyhq/itly-sdk/commit/b3ca3208179fbf2065670d34728bad31010a54a3))
* made LOGGERS a frozen readonly object ([71ff140](https://github.com/iterativelyhq/itly-sdk/commit/71ff140ba17818944fe2d01635647aec0fa2ed8a))
* plugin-testing/node - remove userId from methods return results ([2c7bee5](https://github.com/iterativelyhq/itly-sdk/commit/2c7bee5b81d3e38bb60b6ec1750e81b889b4c823))
* set correct environment for plugin-testing tests ([0cb0618](https://github.com/iterativelyhq/itly-sdk/commit/0cb06189186467559778c9de38f62e320e0aa353))
* wrapped individual plugin method calls in try catch ([932417c](https://github.com/iterativelyhq/itly-sdk/commit/932417c4630e5d51340e8af03bbe50c00b710a74))


### Features

* added plugin-testing ([43e65bc](https://github.com/iterativelyhq/itly-sdk/commit/43e65bca097f50b770d1f2277f036dc02dd691eb))
* added plugin-testing ([fb411bb](https://github.com/iterativelyhq/itly-sdk/commit/fb411bb66f5d371e9a32cc3187c1158e68a59543))





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)


### Features

* extended Plugin interface with post* lifecycle methods (ITLY-1041) ([1ea87db](https://github.com/iterativelyhq/itly-sdk/commit/1ea87dba2649ffe9c6a850a98d673de0189844fd))


### BREAKING CHANGES

* validationError method removed, validationErrorHandler removed in plugin-schema-validator





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)


### Bug Fixes

* changed mParticle instance initialization check ([d516c8a](https://github.com/iterativelyhq/itly-sdk/commit/d516c8a292ca6ad54185409daa8ffcfb339362f1))
* don't re-initialize mParticle instance if it initialized already ([8fb9af5](https://github.com/iterativelyhq/itly-sdk/commit/8fb9af5f25b17044da1531975b30686a653c9973))
* exposed EventMetadata type in sdk ([7713f07](https://github.com/iterativelyhq/itly-sdk/commit/7713f07bef0d5ee8a1bd3856c2b2e84c0f12a205))
* provided env specific default options for options.validation ([947d44a](https://github.com/iterativelyhq/itly-sdk/commit/947d44afe193416052e828999bc901eb7e7ec809))
* refreshed plugin-mparticle's yarn.lock ([112710a](https://github.com/iterativelyhq/itly-sdk/commit/112710a80d4478dc7d999cdcf11e37ccd4acaf82))
* remove mParticle mention from sdk-base Event type ([7bbd330](https://github.com/iterativelyhq/itly-sdk/commit/7bbd330be8d79c641bea1941bca97f0177a70cb3))
* removed itly from MparticleOptions ([39ec98b](https://github.com/iterativelyhq/itly-sdk/commit/39ec98bac3cc25fc211425a746d0e3a5c2b9d181))
* use Mparticle.getInstance to return initialized mParticle instance ([225f543](https://github.com/iterativelyhq/itly-sdk/commit/225f5439afa8b16380b7c444e9a28f7e3b5a5201))


### Features

* added a draft of mparticle browser plugin ([ed4ff71](https://github.com/iterativelyhq/itly-sdk/commit/ed4ff71437a51cbcbdb6cfe54960c2c29fae6383))





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)


### Bug Fixes

* improved platform detection in sdk ([1e7aec7](https://github.com/iterativelyhq/itly-sdk/commit/1e7aec720044ffc0f48f0d60121a557e55b17555))





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)


### Bug Fixes

* protected event.properties from mutation in plugin-mixpanel ([996e5a5](https://github.com/iterativelyhq/itly-sdk/commit/996e5a57287ea37a02ca749c9644f02d7f6da90e))
* removed buffer check loop from plugin-iteratively-node ([1f3c4dc](https://github.com/iterativelyhq/itly-sdk/commit/1f3c4dc7dd0f6b1b18b07e849e97d0f58ba7d6ef))





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Bug Fixes

* updated all [@itly](https://github.com/itly) peerDependencies to latest (^0.9.2) ([6d7e0af](https://github.com/iterativelyhq/itly-sdk/commit/6d7e0af1de9f0166a0883bfc9bc8aa4c18b3d736))
* use schemaVer for snowplow schema ([94329bc](https://github.com/iterativelyhq/itly-sdk/commit/94329bcc66ae7908e85df625d8b0c7b9e3e9c28c))


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)


### Bug Fixes

* don't add validator name/ID into validation.details property ([1b5b22c](https://github.com/iterativelyhq/itly-sdk/commit/1b5b22c44fd0e5df3dab50a4a83e675224767975))
* fixed config.disabled in plugin-debugger-node ([d957e28](https://github.com/iterativelyhq/itly-sdk/commit/d957e286f1ec4da0247a3dd9184d8354889f3ad1))
* renamed debugger plugin to iteratively plugin ([265f4ea](https://github.com/iterativelyhq/itly-sdk/commit/265f4eabaa1003df6ee0c2c39c38aeb7bca1205a))
* renamed redactValues -> omitValues in IterativelyOptions ([1583335](https://github.com/iterativelyhq/itly-sdk/commit/15833356fe706512e9a171df085354928ba75eaa))
* unified iteratively plugin ids for node & browser ([b0e199a](https://github.com/iterativelyhq/itly-sdk/commit/b0e199aa2a0d0ee49696dd644a4dca7252805c33))
* updated debugger TrackModel.dateSent, it's string now ([93555cf](https://github.com/iterativelyhq/itly-sdk/commit/93555cf0b448ee84ebe706fb1867f79ecd26641b))
* updated DebuggerPlugin.validationError() to send correct TrackType ([85ddacd](https://github.com/iterativelyhq/itly-sdk/commit/85ddacd554e5bc04e55a1409e90e4341208142c7))
* updated hygen plugin templates ([0301288](https://github.com/iterativelyhq/itly-sdk/commit/0301288fcfb612573a931f812aff17d8edf5bc4b))





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)


### Bug Fixes

* moved all debugger options to debugger plugins ([66407dc](https://github.com/iterativelyhq/itly-sdk/commit/66407dccee5e54ea0402fdfbdbb592fabb7f3627))
* removed DebugOptions from sdk and sdk-node ([e769a46](https://github.com/iterativelyhq/itly-sdk/commit/e769a46ce24e56b4525f6055048d1aaab690ce7d))





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)


### Bug Fixes

* added ItlyOptions.DebuggerOptions ([00dee7d](https://github.com/iterativelyhq/itly-sdk/commit/00dee7d7d647f77abf3a31ad97cba7892f6f26e8))
* updated debugger plugins to initialize in load (vs constructor) ([dc591a5](https://github.com/iterativelyhq/itly-sdk/commit/dc591a556df87245c6d157a8d6e2dbec6945e1ff))





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.3](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.2...v0.8.3) (2020-06-14)


### Bug Fixes

* fixed plugin-schema-validator support for default events ([2f42ebb](https://github.com/iterativelyhq/itly-sdk/commit/2f42ebb56be5fc6b4686cf704c7281b1146a1ce5))





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
