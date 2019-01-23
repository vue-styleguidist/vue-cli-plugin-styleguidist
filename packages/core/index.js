const styleguidist = require('vue-styleguidist')
const ora = require('ora')
const webpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils')
const kleur = require('kleur')

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
    args => {
      styleguidist(getConfig(args, api)).build((err, config) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Style guide published to', config.styleguideDir)
        }
      }).compiler
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
      let spinner
      const compiler = styleguidist(getConfig(args, api)).server((err, config) => {
        if (err) {
          console.error(err)
        } else {
          const isHttps = compiler.options.devServer && compiler.options.devServer.https
          const urls = webpackDevServerUtils.prepareUrls(
            isHttps ? 'https' : 'http',
            config.serverHost,
            config.serverPort
          )

          if (config.printServerInstructions) {
            config.printServerInstructions(config, { isHttps })
          } else {
            printServerInstructions(urls)
          }
        }
      }).compiler

      // Show message when webpack is recompiling the bundle
      compiler.hooks.invalid.tap('vsgInvalidRecompilation', function() {
        console.log()
        spinner = ora('Compiling...').start()
      })

      // Custom error reporting
      compiler.hooks.done.tap('vsgErrorDone', function(stats) {
        if (spinner) {
          spinner.stop()
        }

        /* const messages = formatWebpackMessages(stats.toJson({}, true))

        if (!messages.errors.length && !messages.warnings.length) {
          printStatus('Compiled successfully!', 'success')
        }

        printAllErrorsAndWarnings(messages, stats.compilation)*/
      })
    }
  )
}

function getConfig(args, api) {
  const fullpathConfig = api.resolve(args.config || './styleguide.config.js')
  const config = require(fullpathConfig)
  config.webpackConfig = api.resolveWebpackConfig()
  return config
}

/**
 * @param {object} urls
 */
function printServerInstructions(urls) {
  console.log(`You can now view your style guide in the browser:`)
  console.log()
  console.log(`  ${kleur.bold('Local:')}            ${urls.localUrlForTerminal}`)
  if (urls.lanUrlForTerminal) {
    console.log(`  ${kleur.bold('On your network:')}  ${urls.lanUrlForTerminal}`)
  }
  console.log()
}
