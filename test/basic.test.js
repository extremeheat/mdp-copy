/* eslint-env mocha */
const cp = require('child_process')
// const lib = require('mdp-copy')

describe('basic', () => {
  it('test', () => {
    cp.execSync('npx mdp-copy --help', { stdio: 'inherit' })
  })
})
