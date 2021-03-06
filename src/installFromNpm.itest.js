/*
© 2018-present Harald Rudell <harald.rudell@gmail.com> (http://www.haraldrudell.com)
This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree.
*/
import { spawnAsync } from 'allspawn'

import fs from 'fs-extra'

import path from 'path'

const projectDir = path.resolve()
const tmpDir = path.join(projectDir, 'tmp')
const npmDir = path.join(tmpDir, 'from-npm')
const appJs = path.join(npmDir, 'src', 'App.js')

it('Install from npm', async () => {
  const twentySeconds = 2e4
  const thirtySeconds = 3e4
  const twoMinutes = 1.2e5
  let t0, timeout

  const testTime = twoMinutes
  jest.setTimeout(testTime)

  // reset project
  console.log(`Ensuring directories…`)
  await fs.ensureDir(tmpDir)
  await fs.emptyDir(npmDir)

  // run create-react-app
  t0 = getT0('Create React App', timeout = twoMinutes)
  await spawnAsync({args: ['npx', 'create-react-app', 'from-npm'], echo: true, options: {cwd: tmpDir}})
  console.log(getElapsed(t0)) // 181210: 41 s

  // add react 16.7
  t0 = getT0('Install react', timeout = thirtySeconds)
  await spawnAsync({args: ['yarn', 'add', 'react@16.7.0-alpha.2', 'react-dom@16.7.0-alpha.2'], echo: true, options: {cwd: npmDir}})
  console.log(getElapsed(t0)) // 181210: 15 s

  // install react-fame from npm
  t0 = getT0('Install react-fame from npm', timeout = twentySeconds)
  await spawnAsync({args: ['yarn', 'add', 'react-fame'], echo: true, options: {cwd: npmDir}})
  console.log(getElapsed(t0)) // 181210: 9 s

  // change App.js
  fs.writeFile(appJs,[
    `import 'react-fame/lib/esm.css'`,
    `export { App as default } from 'react-fame'`,
  ].join('\n'))

  // run
  console.log('run using: (cd tmp/from-npm && yarn start)')

  function getMinutes(ms) {
    const minutes = Math.ceil(ms / 6e4)
    return minutes.toFixed(0)
  }
  function getT0(task, timeout) {
    console.log(`${task} (up to ${getMinutes(timeout)} min)…`)
    return {t0: Date.now(), task}
  }
  function getElapsed({t0, task}) {
    const elapsed = (Date.now() - t0) / 1e3
    return `${task}: ${elapsed.toFixed(1)} s`
  }
})
