const path = require('path')

module.exports = api => {
  api.registerCommand(
    'styleguidist',
    {
      description: 'launch the styleguidist de server',
      usage: 'vue-cli-service styleguidist [options]',
      options: {
        '--config': 'path to the config file'
      }
    },
    (args, rawArgv) => {
      const execa = require('execa')
      const styleguidistBinPath = require.resolve('vue-styleguidist/bin/styleguidist')

      // save the config url of the user if need be
      if (args.config) {
        process.VUE_CLI_STYLEGUIDIST_CONFIG = args.config
      }
      return new Promise((resolve, reject) => {
        const child = execa(styleguidistBinPath, ['--config', path.join(__dirname, 'styleguide.config.js')], {
          cwd: api.resolve('.'),
          stdio: 'inherit'
        })
        child.on('error', reject)
        child.on('exit', code => {
          if (code !== 0) {
            reject(`vue-styleguidist exited with code ${code}.`)
          } else {
            resolve()
          }
        })
      })
    }
  )
}
