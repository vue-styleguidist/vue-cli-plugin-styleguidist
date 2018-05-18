const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

let service = process.VUE_CLI_SERVICE

if (!service) {
  const Service = require('@vue/cli-service/lib/Service')
  service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
  service.init()
}

const chainableWebpackConfig = service.resolveChainableWebpackConfig()

// remove unsupported plugins
chainableWebpackConfig.plugin('preload').remove()
chainableWebpackConfig.plugin('prefetch').remove()

let config = {
  // TODO: check if this can be changed to just require("@vue/cli-service/webpack.config")
  webpackConfig: chainableWebpackConfig.resolveWebpackConfig()
}

// load user customization
if (fs.existsSync(path.resolve(service.context, process.VUE_CLI_STYLEGUIDIST_CONFIG || 'styleguide.config.js'))) {
  config = merge(
    config,
    require(path.resolve(service.context, process.VUE_CLI_STYLEGUIDIST_CONFIG || 'styleguide.config.js'))
  )
}

module.exports = config
