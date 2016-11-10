import test from 'tape'
import command from '../index'
import { tmpdir } from 'os'

test(`command`, assert => {
  assert.ok(typeof (command) === `function`, `exports function`)

  const node = command(`node`)

  assert.ok(typeof (node) === `function`, `returns a function`)

  node(`--version`)
    .then(output => assert.equal(output, process.version))
    .catch(err => assert.notOk(err))

  node([`--version`])
    .then(output => assert.equal(output, process.version))
    .catch(err => assert.notOk(err))

  node(`notavalidarg`)
    .then(r => assert.notOk(r))
    .catch(e => assert.ok(e))

  node([`-e`, `process.stderr.write("bad stuff")`])
    .then(r => assert.notOk(r))
    .catch(e => assert.equal(e, `bad stuff`))

  node([`-e`, `process.stdout.write("success")`])
    .then(r => assert.equal(r, `success`))
    .catch(e => assert.notOk(e))

  node(
    [`-e`, `process.stdout.write(process.cwd())`],
    { cwd: process.cwd() }
  )
    .then(r => assert.equal(r, process.cwd()))
    .catch(e => assert.notOk(e))

  const thisShouldNotExistWouldBeWeirdIfItDid = command(`greatestApplicationMhm`)

  thisShouldNotExistWouldBeWeirdIfItDid()
    .then(r => assert.notOk(r))
    .catch(e => assert.ok(e))

  const noCommand = command()

  noCommand()
    .then(r => assert.notOk(r))
    .catch(e => assert.ok(e))

  assert.end()
})
