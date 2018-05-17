module.exports = api => {
  // register styleguide command
  api.extendPackage({
    scripts: {
      styleguide: 'vue-cli-service styleguidist',
      'styleguide:build': 'vue-cli-service styleguidist:build'
    }
  })

  api.render('./template')
}
