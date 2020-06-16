# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)


### Bug Fixes

* updated sdk-core to always validate context properties ([b678990](https://github.com/iterativelyhq/itly-sdk/commit/b6789909834cb9939289e3c98fb4b202119eb7ed))





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/sdk-core





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* set defaults for ItlyOptions before load(options) callbacks ([066b59b](https://github.com/iterativelyhq/itly-sdk/commit/066b59bf1aaf208f05f800b89e95bb9687361910))
* updated debugger plugin package version (using `lerna bootstrap`) ([f0e0882](https://github.com/iterativelyhq/itly-sdk/commit/f0e088239c2d9f3cd58ace1b1119ba56c56ede01))


### Features

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





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)

**Note:** Version bump only for package @itly/sdk-core





# [0.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.4.0...v0.5.0) (2020-06-09)


### Bug Fixes

* added getPlugin(id: string) to sdk-core and sdk-node ([7e4c82f](https://github.com/iterativelyhq/itly-sdk/commit/7e4c82f115292f6e246200401c61952a87be8168))


### Features

* added ItlyOptions.validationOptions ([7e3bc99](https://github.com/iterativelyhq/itly-sdk/commit/7e3bc998f8a7e1de36bd37a1e3d6cefcf72a6239))





# [0.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.3.0...v0.4.0) (2020-06-06)

**Note:** Version bump only for package @itly/sdk-core





# [0.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.2.0...v0.3.0) (2020-06-05)


### Features

* renamed @itly/plugin-schema-validator ([e54ec8a](https://github.com/iterativelyhq/itly-sdk/commit/e54ec8a5b2fb20b8c06aab8db356d002d57c40c5))





# [0.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.1.1...v0.2.0) (2020-06-05)


### Bug Fixes

* Fixed error in plugin validation ([038ea94](https://github.com/iterativelyhq/itly-sdk/commit/038ea94f28050055bbd60c061c47cc6af283d639))


### Features

* Store compiled validators for faster validation ([5a63a74](https://github.com/iterativelyhq/itly-sdk/commit/5a63a74cfbb98e21fffe9f8708652ab5185ec7a3))
* Validation and Destinations are now plugins ([920648c](https://github.com/iterativelyhq/itly-sdk/commit/920648c29757a762c9929fbd748ed8ed5e725045))


### BREAKING CHANGES

* Switch to plugin architecture
