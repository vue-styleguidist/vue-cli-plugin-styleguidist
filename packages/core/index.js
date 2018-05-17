module.exports = api => {
  api.registerCommand(
    'styleguidist',
    {
      description: 'run unit tests with jest',
      usage: 'vue-cli-service test:unit [options] <regexForTestFiles>',
      options: {
        '--watch': 'run tests in watch mode'
      },
      details:
        `All jest command line options are supported.\n` +
        `See https://facebook.github.io/jest/docs/en/cli.html for more details.`
    },
    (args, rawArgv) => {
      const execa = require('execa')
      const styleguidistBinPath = require.resolve('vue-styleguidist/bin/styleguidist')

      // TODO: resolve abstracted config files as a param
      return new Promise((resolve, reject) => {
        const child = execa(styleguidistBinPath, rawArgv, {
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
