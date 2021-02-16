# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.0...v2.0.1) (2021-02-02)


### Bug Fixes

* introduce LoadOptions for itly.load() ([e16eeb8](https://github.com/iterativelyhq/itly-sdk/commit/e16eeb8260419cc8f2ca5c449a8000ea74028e3b))
* use typed object params for itly.load() ([1d76ce1](https://github.com/iterativelyhq/itly-sdk/commit/1d76ce16a44a52afa7751078d92a2c7a6354e071))





# [2.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.6.0...v2.0.0) (2021-01-20)


### Bug Fixes

* added " for Iteratively SDK" suffix to plugin titles/descriptions ([12876a5](https://github.com/iterativelyhq/itly-sdk/commit/12876a508ae19006d76374b9bf48dfd0d9eb94af))
* added explicit exports in addition to default exports ([401637e](https://github.com/iterativelyhq/itly-sdk/commit/401637e61ee63714d4db1ccabebfa31b73c15842))
* added simple README's to all  packages ([b3a6eb2](https://github.com/iterativelyhq/itly-sdk/commit/b3a6eb2f7083f0e6e4107b2aa740e962c77128c6))
* core Itly shouldn’t be a singleton ([79c0e63](https://github.com/iterativelyhq/itly-sdk/commit/79c0e63fb938a6e1741cf36bec477c0733bf7a8e))
* remove getPlugin() method in itly-sdk ([32d4b14](https://github.com/iterativelyhq/itly-sdk/commit/32d4b14195b1bd44d27db8c56a7d4553e81e9137))
* removed the Node and Browser terms from all the Plugin class names ([a1e2f4b](https://github.com/iterativelyhq/itly-sdk/commit/a1e2f4b74dd4c879c28eba18e583557c1c763b92))
* separate context from Options ([dc6aeb6](https://github.com/iterativelyhq/itly-sdk/commit/dc6aeb6d24df060900e6e7c568d9f7854bf621a5))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))
* only configure plugins if instance is not provided ITLY-1510 ([309e0e4](https://github.com/iterativelyhq/itly-sdk/commit/309e0e461731b6ce34e109a6b5aea7b2dbfe775a))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)

**Note:** Version bump only for package @itly/plugin-amplitude





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)

**Note:** Version bump only for package @itly/plugin-amplitude





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)

**Note:** Version bump only for package @itly/plugin-amplitude





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)

**Note:** Version bump only for package @itly/plugin-amplitude





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)

**Note:** Version bump only for package @itly/plugin-amplitude





## [1.1.2](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.1...v1.1.2) (2020-08-05)

**Note:** Version bump only for package @itly/plugin-amplitude





## [1.1.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.0...v1.1.1) (2020-07-28)

**Note:** Version bump only for package @itly/plugin-amplitude





# [1.1.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.0.0...v1.1.0) (2020-07-06)


### Bug Fixes

* updated all [@itly](https://github.com/itly) peerDependencies to latest (^0.9.2) ([6d7e0af](https://github.com/iterativelyhq/itly-sdk/commit/6d7e0af1de9f0166a0883bfc9bc8aa4c18b3d736))


### Features

* renamed 'sdk-core' 'sdk' ([5e596ab](https://github.com/iterativelyhq/itly-sdk/commit/5e596ab1656e2659684024e665d8e57cca0ef258))





# [1.0.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.2...v1.0.0) (2020-06-30)

**Note:** Version bump only for package @itly/plugin-amplitude





## [0.9.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.1...v0.9.2) (2020-06-17)

**Note:** Version bump only for package @itly/plugin-amplitude





## [0.9.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.9.0...v0.9.1) (2020-06-17)


### Bug Fixes

* updated debugger plugins to initialize in load (vs constructor) ([dc591a5](https://github.com/iterativelyhq/itly-sdk/commit/dc591a556df87245c6d157a8d6e2dbec6945e1ff))





# [0.9.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.3...v0.9.0) (2020-06-16)


### Bug Fixes

* moved plugin setup logic into load() hook rather than constructors ([f704ba4](https://github.com/iterativelyhq/itly-sdk/commit/f704ba485fc50967c8f73498230b88f8553768a5))
* updated all plugins to extend base tsconfig.json ([8cf5a6e](https://github.com/iterativelyhq/itly-sdk/commit/8cf5a6e412e23a5a6ad059cd37acb08f5ae552ce))


### Features

* removed Itly prefix from core classes ([b512e6d](https://github.com/iterativelyhq/itly-sdk/commit/b512e6d828cd307b95f879ea9b4d1aa0054494ca))





## [0.8.2](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.1...v0.8.2) (2020-06-14)

**Note:** Version bump only for package @itly/plugin-amplitude





## [0.8.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.8.0...v0.8.1) (2020-06-13)

**Note:** Version bump only for package @itly/plugin-amplitude





# [0.8.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.1...v0.8.0) (2020-06-13)


### Bug Fixes

* cleaned up plugin-amplitude tests and added coverage ([82f4b2a](https://github.com/iterativelyhq/itly-sdk/commit/82f4b2a1cef22b6c1b5b9d8c644902695e5a2582))
* made tests to be per module with common jest.config.base.js ([1b8f1cd](https://github.com/iterativelyhq/itly-sdk/commit/1b8f1cd968d90a698ecf12d0a3f34dc5cf76cb0b))


### Features

* added tests for plugin-ampltude ([13cbbf8](https://github.com/iterativelyhq/itly-sdk/commit/13cbbf8ec7c573e4d2007eead6ad18c232884522))





## [0.7.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.7.0...v0.7.1) (2020-06-12)

**Note:** Version bump only for package @itly/plugin-amplitude





# [0.7.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.1...v0.7.0) (2020-06-11)

**Note:** Version bump only for package @itly/plugin-amplitude





## [0.6.1](https://github.com/iterativelyhq/itly-sdk/compare/v0.6.0...v0.6.1) (2020-06-09)

**Note:** Version bump only for package @itly/plugin-amplitude





# [0.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v0.5.0...v0.6.0) (2020-06-09)


### Features

* added plugin-amplitude for browser integration ([78ef65e](https://github.com/iterativelyhq/itly-sdk/commit/78ef65e56095734f97b935defb001cea0ee8807d))
