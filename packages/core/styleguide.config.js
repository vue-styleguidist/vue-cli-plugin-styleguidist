const fs = require('fs')
const path = require('path')
const merge = require('webpack-merge')

function getWebpackConfig () {
  process.env.VUE_CLI_SERVICE_CONFIG_PATH = path.join(__dirname, 'compiler.config.js')
  const webpackConfig = require('@vue/cli-service/webpack.config')
  webpackConfig.plugins = webpackConfig.plugins.filter(
    plugin => !plugin.options || ['preload', 'prefetch'].indexOf(plugin.options.rel) < 0
  )
  return webpackConfig
}

const webpackConfig = getWebpackConfig()
let config = {
  components: path.join(webpackConfig.context, 'src/components/**/[A-Z]*.vue'),
  // TODO: this should be changed to just require("@vue/cli-service/webpack.config")
  // as soon as preload and prefetch are working
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
