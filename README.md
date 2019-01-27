[![Build Status](https://travis-ci.org/vue-styleguidist/vue-cli-plugin-styleguidist.svg?branch=master)](https://travis-ci.org/vue-styleguidist/vue-cli-plugin-styleguidist) 
[![npm package](https://img.shields.io/npm/v/vue-cli-plugin-styleguidist.svg)](https://www.npmjs.com/package/vue-cli-plugin-styleguidist)
<a href="https://discordapp.com/channels/325477692906536972/538786416092512278">
    <img src="https://img.shields.io/discord/325477692906536972.svg?logo=discord"
alt="chat on Discord">
  </a>

# vue-cli-plugin-styleguidist

This is a vue-cli 3.x plugin to add [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) in your Vue project.

## Install

If you don't have a project created with Vue CLI 3:

```bash
vue create my-app
```

Add the plugin to your project:

```bash
cd my-app
vue add styleguidist
```

## Usage

After installation, invoke `vue-styleguidist` with:

```bash
npm run styleguide
```

## Configurations

`vue-styleguidist` have some plugin options in `styleguide.config.js`

You can read all the options [here](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Configuration.md).

## Contribution

This project uses a monorepo setup that requires using [Yarn](https://yarnpkg.com) because it relies on [Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

```bash
git clone https://github.com/elevatebart/vue-cli-plugin-styleguidist.git
yarn
```

## Run Unit Tests

```bash
yarn test
```

Issues and questions are more than welcome.
