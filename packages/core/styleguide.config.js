const webpackConfig = require('@vue/cli-service/webpack.config')

// remove unsupported plugins
delete webpackConfig.plugins

// TODO: merge the user defined config with this one

module.exports = {
  webpackConfig
}
