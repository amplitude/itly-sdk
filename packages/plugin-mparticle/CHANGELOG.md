# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.3.1 (2021-05-21)

**Note:** Version bump only for package @itly/plugin-mparticle





# [2.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.2...v2.3.0) (2021-05-20)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.2.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.1...v2.2.2) (2021-05-06)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.2.1](https://github.com/iterativelyhq/itly-sdk/compare/v2.2.0...v2.2.1) (2021-04-24)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.0.9](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.8...v2.0.9) (2021-04-01)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.0.8](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.7...v2.0.8) (2021-03-25)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.0.7](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.6...v2.0.7) (2021-03-19)

**Note:** Version bump only for package @itly/plugin-mparticle





## [2.0.6](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.5...v2.0.6) (2021-03-15)


### Features

* added mParticle plugin for React Native ([1e536b4](https://github.com/iterativelyhq/itly-sdk/commit/1e536b4cd57bcbc2beec3dededecec7611c00f77))





## [2.0.5](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.4...v2.0.5) (2021-03-11)


### Bug Fixes

* load mParticle browser code from CDN ([2cddf8b](https://github.com/iterativelyhq/itly-sdk/commit/2cddf8b91e546550ff8eb6de8ef608b1c13b8933))
* restored shallow copy for event properties ([2ebf1db](https://github.com/iterativelyhq/itly-sdk/commit/2ebf1dbe12d9ac552e6118128ed2a95f805ef7ad))
* use official @mparticle/web-sdk package ([9069c5c](https://github.com/iterativelyhq/itly-sdk/commit/9069c5c95e52aca25ddc16ec5709fda6ee0ca75e))


### Features

* added 'call options' for tracking methods ([efa287e](https://github.com/iterativelyhq/itly-sdk/commit/efa287e85ff97309cd279a60cdaf7ebcdf4c5c32))





## [2.0.2](https://github.com/iterativelyhq/itly-sdk/compare/v2.0.1...v2.0.2) (2021-02-26)


### Bug Fixes

* added explicit "files" to package.json files ([3ca0c55](https://github.com/iterativelyhq/itly-sdk/commit/3ca0c55b828c66244a26738571aae5dca31425cf))
* added typed ItlyBrowser and ItlyNode ([77bee56](https://github.com/iterativelyhq/itly-sdk/commit/77bee562676845445e0aa63675990a6c003a3d92))


### Features

* added base class for plugins that need request/response logging ([f043add](https://github.com/iterativelyhq/itly-sdk/commit/f043add64e59c7662fb251de349e255accb0c477))
* added ESM support ([c265689](https://github.com/iterativelyhq/itly-sdk/commit/c2656892daddb36459e2a061b553890e616d04c2))
* added PluginLogger ([2d8c764](https://github.com/iterativelyhq/itly-sdk/commit/2d8c764eab480e9c392545cf1f77fff5753a2e15))
* log Mparticle requests ([fb5b067](https://github.com/iterativelyhq/itly-sdk/commit/fb5b0677fb1c41fd04e82414c9ef22a9364d6f50))





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
* removed the Node and Browser terms from all the Plugin class names ([a1e2f4b](https://github.com/iterativelyhq/itly-sdk/commit/a1e2f4b74dd4c879c28eba18e583557c1c763b92))
* separate context from Options ([dc6aeb6](https://github.com/iterativelyhq/itly-sdk/commit/dc6aeb6d24df060900e6e7c568d9f7854bf621a5))
* update Plugin to accept id in constructor ([86be0ef](https://github.com/iterativelyhq/itly-sdk/commit/86be0ef59b950c68c9f1fa842fbfa70ec9c73bb6))


### Features

* new version 2.0.0 ([8843dc2](https://github.com/iterativelyhq/itly-sdk/commit/8843dc26d6bdb1854101e871007c72d55b27170c))


### BREAKING CHANGES

* separated context from Options in itly.load()
* browser and node Itly no longer a singleton





# [1.6.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.5.0...v1.6.0) (2020-12-04)

**Note:** Version bump only for package @itly/plugin-mparticle





## [1.4.1](https://github.com/iterativelyhq/itly-sdk/compare/v1.4.0...v1.4.1) (2020-10-29)

**Note:** Version bump only for package @itly/plugin-mparticle





# [1.4.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.3.0...v1.4.0) (2020-10-28)


### Features

* added plugin-testing ([fb411bb](https://github.com/iterativelyhq/itly-sdk/commit/fb411bb66f5d371e9a32cc3187c1158e68a59543))





# [1.3.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.2.0...v1.3.0) (2020-09-08)

**Note:** Version bump only for package @itly/plugin-mparticle





# [1.2.0](https://github.com/iterativelyhq/itly-sdk/compare/v1.1.2...v1.2.0) (2020-08-22)


### Bug Fixes

* changed mParticle instance initialization check ([d516c8a](https://github.com/iterativelyhq/itly-sdk/commit/d516c8a292ca6ad54185409daa8ffcfb339362f1))
* don't re-initialize mParticle instance if it initialized already ([8fb9af5](https://github.com/iterativelyhq/itly-sdk/commit/8fb9af5f25b17044da1531975b30686a653c9973))
* refreshed plugin-mparticle's yarn.lock ([112710a](https://github.com/iterativelyhq/itly-sdk/commit/112710a80d4478dc7d999cdcf11e37ccd4acaf82))
* removed itly from MparticleOptions ([39ec98b](https://github.com/iterativelyhq/itly-sdk/commit/39ec98bac3cc25fc211425a746d0e3a5c2b9d181))
* use Mparticle.getInstance to return initialized mParticle instance ([225f543](https://github.com/iterativelyhq/itly-sdk/commit/225f5439afa8b16380b7c444e9a28f7e3b5a5201))


### Features

* added a draft of mparticle browser plugin ([ed4ff71](https://github.com/iterativelyhq/itly-sdk/commit/ed4ff71437a51cbcbdb6cfe54960c2c29fae6383))
