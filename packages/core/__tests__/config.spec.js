jest.setTimeout(20000)

const create = require('@vue/cli-test-utils/createTestProject')
const path = require('path')
const cwd = path.resolve(__dirname, '../../../test')

async function createAndInstall (name) {
  const project = await create(name, { plugins: { 'vue-cli-plugin-styleguidist': {}}}, cwd)
  // mock install
  const pkg = JSON.parse(await project.read('package.json'))
  pkg.devDependencies['vue-cli-plugin-styleguidist'] = '*'
  await project.write('package.json', JSON.stringify(pkg, null, 2))
  return project
}

test('change styleguideDir folder', async () => {
  const project = await createAndInstall(`ccf`)
  const config = await project.read('styleguide.config.js')
  await project.write(
    'styleguide.config.js',
    config.replace(/(module\.exports = \{)/, "$1\n  styleguideDir: 'notDist',")
  )
  await project.run('vue-cli-service styleguidist:build')
  expect(project.has('notDist/index.html')).toBeTruthy()
})
