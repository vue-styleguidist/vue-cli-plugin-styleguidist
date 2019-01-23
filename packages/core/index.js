const styleguidist = require('vue-styleguidist')

module.exports = api => {
  api.configureWebpack(() => ({
    // make sure that the docs blocks
    // are ignored during normal serve & build
    module: {
      rules: [
        {
          resourceQuery: /blockType=docs/,
          loader: 'null-loader'
        }
      ]
    }
  }))

  api.registerCommand(
    'styleguidist:build',
    {
      description: 'build the styleguidist website',
      usage: 'vue-cli-service styleguidist:build [options]',
      options: {
        '--config': 'path to the config file'
      }
    },
    args => {
      const conf = api.resolve(args.config || './styleguide.config.js')
      styleguidist(conf, config => (config.webpackConfig = getConfig(api))).binutils.build()
    }
  )

  api.registerCommand(
    'styleguidist',
    {
      description: 'launch the styleguidist dev server',
      usage: 'vue-cli-service styleguidist [options]',
      options: {
        '--config': 'path to the config file'
      }
    },
    args => {
      const conf = api.resolve(args.config || './styleguide.config.js')
      styleguidist(conf, config => (config.webpackConfig = getConfig(api))).binutils.server(args.open)
    }
  )
}

function getConfig(api) {
  const conf = api.resolveChainableWebpackConfig()
  conf.plugins.delete('hmr')
  return conf.toConfig()
}
