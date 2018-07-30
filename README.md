[![Build Status](https://travis-ci.org/vue-styleguidist/vue-cli-plugin-styleguidist.svg?branch=master)](https://travis-ci.org/vue-styleguidist/vue-cli-plugin-styleguidist) 
[![npm package](https://img.shields.io/npm/v/vue-cli-plugin-styleguidist.svg)](https://www.npmjs.com/package/vue-cli-plugin-styleguidist)
[![Join the chat at https://gitter.im/vue-style/Lobby](https://badges.gitter.im/vue-style/Lobby.svg)](https://gitter.im/vue-style/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# vue-cli-plugin-styleguidist

This is a vue-cli 3.x plugin to add [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) in your Vue project.

## Install

If yon don't have a project created with Vue CLI 3:

```bash
vue create my-app
```

Install the plugin into your project:

```bash
cd my-vue-app
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
