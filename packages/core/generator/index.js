module.exports = api => {
  api.registerCommand('styleguidist', () => {
    // ...
  })
  // register styleguide command
  api.extendPackage({
    scripts: {
      styleguide: 'vue-cli-service styleguidist',
      'styleguide:build': 'vue-cli-service styleguidist'
    }
  })

  api.render('./template')
}
