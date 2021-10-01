# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://github.com/amplitude/itly-sdk/compare/v2.3.4...v2.4.0) (2021-10-01)


### Reverts

* Revert "chore: experimental rename @itly -> @amplitude" ([8cc854b](https://github.com/amplitude/itly-sdk/commit/8cc854bc550b687842d412c21b77deca0dfb962e))





## 2.3.4 (2021-06-29)

**Note:** Version bump only for package @itly/plugin-segment-node





## 2.3.3 (2021-06-28)

**Note:** Version bump only for package @itly/plugin-segment-node





## 2.3.2 (2021-06-01)

**Note:** Version bump only for package @itly/plugin-segment-node





## 2.3.1 (2021-05-21)

**Note:** Version bump only for package @itly/plugin-segment-node





# [2.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.2...v2.3.0) (2021-05-20)


### Bug Fixes

* extended Segment options/integrations to support any keys/values ([55b8ea7](https://github.com/iterativelyhq/itly-sdk/commit/55b8ea78605902fe6d528c8c3cb73796cfeac96b))





## [2.2.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.1...v2.2.2) (2021-05-06)

**Note:** Version bump only for package @itly/plugin-segment-node





## [2.2.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.0...v2.2.1) (2021-04-24)


### Bug Fixes

* page() - optional 'name' and 'category' parameters ([4776bc5](https://github.com/iterativelyhq/itly-sdk/commit/4776bc5028b59bd59f250b38460220139d4d5e7a))





## [2.0.9](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.8...v2.0.9) (2021-04-01)

**Note:** Version bump only for package @itly/plugin-segment-node





## [2.0.8](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.7...v2.0.8) (2021-03-25)


### Bug Fixes

* isolated CallOptions by Plugin ([da3a3e2](https://github.com/iterativelyhq/itly-sdk/commit/da3a3e26a997c6a0a0a197561a72b32ec49ad36e))





## [2.0.7](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.6...v2.0.7) (2021-03-19)

**Note:** Version bump only for package @itly/plugin-segment-node





## [2.0.6](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.5...v2.0.6) (2021-03-15)

**Note:** Version bump only for package @itly/plugin-segment-node





## [2.0.5](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.4...v2.0.5) (2021-03-11)


### Bug Fixes

* added stronger types for Node plugin callbacks ([1f86e45](https://github.com/iterativelyhq/itly-sdk/commit/1f86e45bc341d767e9fa4339668913ec9341693f))
* make destination client getters public in browser plugins ([34c68e3](https://github.com/iterativelyhq/itly-sdk/commit/34c68e3e04364699b49aeb2a51f40e7dd2ebb681))
* reduced log/callback code duplication ([eb5f19f](https://github.com/iterativelyhq/itly-sdk/commit/eb5f19fcdd25ca1fe3fd5d38b3a7f061c17a9111))
* restored shallow copy for event properties ([2ebf1db](https://github.com/iterativelyhq/itly-sdk/commit/2ebf1dbe12d9ac552e6118128ed2a95f805ef7ad))
* separated Segment node track fields from callback ([4e91aaa](https://github.com/iterativelyhq/itly-sdk/commit/4e91aaa51344a435eb1dd03f5f831c75287f9b36))


### Features

* added 'call options' for tracking methods ([efa287e](https://github.com/iterativelyhq/itly-sdk/commit/efa287e85ff97309cd279a60cdaf7ebcdf4c5c32))
* added callbacks to tracking methods ([fac00d9](https://github.com/iterativelyhq/itly-sdk/commit/fac00d9672e3d5db1bd47c2251e99fe6275dcf64))
* added EventOptions and Segment event metadata ([8cd2507](https://github.com/iterativelyhq/itly-sdk/commit/8cd25077b207dfd5c85fac2fe4161edd25f18afb))





## [2.0.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.1...v2.0.2) (2021-02-26)


### Bug Fixes

* added explicit "files" to package.json files ([3ca0c55](https://github.com/iterativelyhq/itly-sdk/commit/3ca0c55b828c66244a26738571aae5dca31425cf))


### Features

* added base class for plugins that need request/response logging ([f043add](https://github.com/iterativelyhq/itly-sdk/commit/f043add64e59c7662fb251de349e255accb0c477))
* added ESM support ([c265689](https://github.com/iterativelyhq/itly-sdk/commit/c2656892daddb36459e2a061b553890e616d04c2))
* added PluginLogger ([2d8c764](https://github.com/iterativelyhq/itly-sdk/commit/2d8c764eab480e9c392545cf1f77fff5753a2e15))
* log Segment (Node) requests ([adb136a](https://github.com/iterativelyhq/itly-sdk/commit/adb136a650c1be36410e1d2daea594f38d3462f7))





## [2.0.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.0...v2.0.1) (2021-02-02)

**Note:** Version bump only for package @itly/plugin-segment-node





# [2.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.6.0...v2.0.0) (2021-01-20)


### Bug Fixes

* added " for Iteratively SDK" suffix to plugin titles/descriptions ([12876a5](https://github.com/iterativelyhq/itly-sdk/commit/12876a508ae19006d76374b9bf48dfd0d9eb94af))
* added explicit exports in addition to default exports ([401637e](https://github.com/iterativelyhq/itly-sdk/commit/401637e61ee63714d4db1ccabebfa31b73c15842))
* added simple README's to all  packages ([b3a6eb2](https://github.com/iterativelyhq/itly-sdk/commit/b3a6eb2f7083f0e6e4107b2aa740e962c77128c6))
* removed the Node and Browser terms from all the Plugin class names ([a1e2f4b](https://github.com/iterativelyhq/itly-sdk/commit/a1e2f4b74dd4c879c28eba18e583557c1c763b92))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* added flush method ([0213284](https://github.com/iterativelyhq/itly-sdk/commit/0213284a8fab0b3f3beb1d12e14358c873d31027))
* flush method returns Promise ([d0aaac7](https://github.com/iterativelyhq/itly-sdk/commit/d0aaac7f5623c0f698b1b9c06875dc9707f2bd58))
* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)

**Note:** Version bump only for package @itly/plugin-segment-node





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)

**Note:** Version bump only for package @itly/plugin-segment-node





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)

**Note:** Version bump only for package @itly/plugin-segment-node





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)

**Note:** Version bump only for package @itly/plugin-segment-node





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)

**Note:** Version bump only for package @itly/plugin-segment-node





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)

**Note:** Version bump only for package @itly/plugin-segment-node





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)

**Note:** Version bump only for package @itly/plugin-segment-node





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Bug Fixes

* updated all [@itly](https://github.com/itly) peerDependencies to latest (^0.9.2) ([6d7e0af](https://github.com/iterativelyhq/itly-sdk/commit/6d7e0af1de9f0166a0883bfc9bc8aa4c18b3d736))


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)

**Note:** Version bump only for package @itly/plugin-segment-node





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)

**Note:** Version bump only for package @itly/plugin-segment-node





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)

**Note:** Version bump only for package @itly/plugin-segment-node





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)

**Note:** Version bump only for package @itly/plugin-segment-node





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/plugin-segment-node





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))
* renamed 'writeKey' in Segment plugins ([57c9137](https://github.com/iterativelyhq/itly-sdk/commit/57c9137d4bbeac4c89a3dd0f6faa7150fe4fe3b2))





## [0.7.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.0...v0.7.1) (2020-06-12)

**Note:** Version bump only for package @itly/plugin-segment-node





# [0.7.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.1...v0.7.0) (2020-06-11)

**Note:** Version bump only for package @itly/plugin-segment-node





## [0.6.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.0...v0.6.1) (2020-06-09)

**Note:** Version bump only for package @itly/plugin-segment-node





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)

**Note:** Version bump only for package @itly/plugin-segment-node





# [0.5.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.4.0...v0.5.0) (2020-06-09)


### Bug Fixes

* removed ItlyOptions from plugin-segment-node ([93e412f](https://github.com/iterativelyhq/itly-sdk/commit/93e412f5e58276e692264386c5cc6345d3f6813f))





# [0.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.3.0...v0.4.0) (2020-06-06)


### Features

* added plugin-mixpanel-node ([c9e2525](https://github.com/iterativelyhq/itly-sdk/commit/c9e2525aa76142b66ef2422754f789251302bf1c))
