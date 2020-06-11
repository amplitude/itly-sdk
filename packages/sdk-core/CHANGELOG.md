# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
