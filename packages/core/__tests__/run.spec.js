jest.setTimeout(20000)

const create = require('@vue/cli-test-utils/createTestProject')
const path = require('path')
const cwd = path.resolve(__dirname, '../../../test')
const serve = require('@vue/cli-test-utils/serveWithPuppeteer')

async function createAndInstall (name) {
  const project = await create(name, { plugins: { 'vue-cli-plugin-styleguidist': {}}}, cwd)
  // mock install
  const pkg = JSON.parse(await project.read('package.json'))
  pkg.devDependencies['vue-cli-plugin-styleguidist'] = '*'
  await project.write('package.json', JSON.stringify(pkg, null, 2))
  return project
}

test('serve', async () => {
  const project = await createAndInstall(`serve`)
  await serve(
    () => project.run('vue-cli-service styleguidist'),
    async ({ helpers }) => {
      expect(await helpers.getText('h1[class^=rsg--logo]')).toMatch('Default Style Guide')
    }
  )
})

test('build', async () => {
  const project = await createAndInstall(`build`)
  const stdout = await project.run('vue-cli-service styleguidist:build')
  expect(stdout).toMatch('Style guide published')
  expect(project.has('dist/index.html')).toBe(true)
})
