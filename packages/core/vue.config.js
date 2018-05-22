// this file is used to make sure that the Service loads
// vue as a compiler and not as a runtime esm

const merge = require('webpack-merge')
const fs = require('fs')
const path = require('path')

// load user customization
const pathToCustomConfig = path.resolve(process.env.VUE_CLI_CONTEXT || process.cwd(), 'vue.config.js')

const customConfig = fs.existsSync(pathToCustomConfig) ? require(pathToCustomConfig) : {}

// then merge it with compiler true
module.exports = merge(customConfig, {
  compiler: true
})
