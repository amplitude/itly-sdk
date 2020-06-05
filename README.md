# itly-sdk
Iteratively analytics SDKs and plugins for Javascript and Typescript

# Contributing

## Creating plugins
There are [hygen](https://github.com/jondot/hygen) templates for creating a new plugin.
```
# Install hygen
$ brew tap jondot/tap
$ brew install hygen
```

Use `hygen plugin new <name>` to create a new plugin module. Follow the prompts to set the author, base SDK(@itly/sdk, @itly/sdk-node), and SDK version range.
```
# Create new 'awesome-analytics' plugin
itly-sdk $ hygen plugin new awesome-analytics

✔ Author? · Iteratively
✔ Itly SDK? · @itly/sdk
✔ Itly SDK version? · ^0.1.2

Loaded templates: _templates
       added: packages/plugin-awesome-analytics/.npmignore
       added: packages/plugin-awesome-analytics/lib/index.ts
       added: packages/plugin-awesome-analytics/package.json
       added: packages/plugin-awesome-analytics/tsconfig.json
``` 

## Commits
itly-sdk uses [convential commits](https://www.conventionalcommits.org/), a structured commit message format, to make managing our releases easier and provide better documentation. Commit messages are restricted to conventional commits format via [husky](https://www.npmjs.com/package/husky).

Thanks for your contributions!