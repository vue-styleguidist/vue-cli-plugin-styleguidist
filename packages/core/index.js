const execa = require('execa')

const runCommand = (api, cmd) => (args, rawArgv) => {
  const styleguidistBinPath = require.resolve('vue-styleguidist/bin/styleguidist')

  const extraargs = []
  // save the config url of the user if need be
  if (args.config) {
    extraargs.push('--config')
    extraargs.push(args.config)
  }
  return new Promise((resolve, reject) => {
    const server = execa(styleguidistBinPath, [cmd, ...extraargs], {
      cwd: api.resolve('.'),
      stdio: 'inherit'
    })
    server.on('error', reject)
    server.on('exit', code => {
      if (code !== 0) {
        reject(`vue-styleguidist exited with code ${code}.`)
      } else {
        if (process.env.VUE_CLI_TEST) {
          process.exit()
        } else {
          console.log('exited styleguide')
          resolve()
        }
      }
    })

    // on appveyor, killing the process with SIGTERM causes execa to
    // throw error
    if (process.env.VUE_CLI_TEST) {
      process.stdin.on('data', data => {
        if (data.toString() === 'close') {
          console.log('got close signal!')
          process.exit()
        }
      })
    }
  })
}

module.exports = api => {
  api.registerCommand(
    'styleguidist',
    {
      description: 'launch the styleguidist dev server',
      usage: 'vue-cli-service styleguidist [options]',
      options: {
        '--config': 'path to the config file'
      }
    },
    runCommand(api, 'server')
  )

  api.registerCommand(
    'styleguidist:build',
    {
      description: 'build the styleguidist website',
      usage: 'vue-cli-service styleguidist:build [options]',
      options: {
        '--config': 'path to the config file'
      }
    },
    runCommand(api, 'build')
  )
}
