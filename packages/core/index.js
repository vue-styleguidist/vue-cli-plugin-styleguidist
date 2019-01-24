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
      getStyleguidist(args, api).binutils.build()
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
      const server = getStyleguidist(args, api).binutils.server(args.open)

      // in order to avoid ghosted threads at the end of tests
      ;['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
          server.close(() => {
            process.exit(0)
          })
        })
      })
    }
  )
}

function getStyleguidist(args, api) {
  const conf = api.resolve(args.config || './styleguide.config.js')
  return styleguidist(conf, config => (config.webpackConfig = getConfig(api)))
}

function getConfig(api) {
  const conf = api.resolveChainableWebpackConfig()
  conf.plugins.delete('hmr')
  return conf.toConfig()
}
