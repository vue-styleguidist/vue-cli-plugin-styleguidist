const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

const webpackConfig = require('@vue/cli-service/webpack.config')
let config = {
  components: path.join(webpackConfig.context, 'src/components/**/[A-Z]*.vue'),
  webpackConfig
}

// load user customization
const pathToCustomConfig = path.resolve(
  webpackConfig.context,
  process.VUE_CLI_STYLEGUIDIST_CONFIG || 'styleguide.config.js'
)

const pathProperties = ['components', 'content']
function fixPathToAppRootFolder (conf) {
  const pathToCustomConfigDirName = path.dirname(pathToCustomConfig)
  Object.keys(conf).map(prop => {
    if (typeof conf[prop] === 'object') {
      fixPathToAppRootFolder(conf[prop])
    } else {
      if (pathProperties.indexOf(prop) >= 0) {
        conf[prop] = path.resolve(pathToCustomConfigDirName, conf[prop])
      }
    }
  })
}

if (fs.existsSync(pathToCustomConfig)) {
  const customizedConfig = require(pathToCustomConfig)
  fixPathToAppRootFolder(customizedConfig)
  config = merge(config, customizedConfig)
}

module.exports = config
