const styleguidist = require('vue-styleguidist')

module.exports = api => {
  api.configureWebpack(webpackConfig => ({
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
    args =>
      styleguidist(getConfig(args, api)).build((err, config) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Style guide published to', config.styleguideDir)
        }
      })
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
    args =>
      styleguidist(getConfig(args, api)).server((err, config) => {
        if (err) {
          console.log(err)
        } else {
          const url = `http://localhost:${config.serverPort}`
          console.log(`Listening at ${url}`)
        }
      })
  )
}

function getConfig(args, api) {
  const fullpathConfig = api.resolve(args.config || './styleguide.config.js')
  const config = require(fullpathConfig)
  config.webpackConfig = api.resolveWebpackConfig()
  return config
}
