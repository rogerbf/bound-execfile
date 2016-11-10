import test from 'tape'
import exec from '../index'

test(`exec`, assert => {
  assert.ok(typeof (exec) === `function`, `is a function`)

  assert.test(`returns a function`, assert => {
    const node = exec(`node`)
    assert.ok(typeof (node) === `function`)
    assert.end()
  })

  const node = exec(`node`)

  assert.test(`single argument (string)`, assert => {
    node(`--version`)
      .then(output => {
        assert.equal(output, process.version)
        assert.end()
      })
      .catch(err => {
        assert.notOk(err, `this should never be evaluated`)
        assert.end()
      })
  })

  assert.test(`single argument (array)`, assert => {
    node([`--version`])
      .then(output => {
        assert.equal(output, process.version)
        assert.end()
      })
      .catch(err => {
        assert.notOk(err)
        assert.end()
      })
  })

  assert.test(`multiple arguments, should resolve with no value`, assert => {
    node([`-e`, `const robot = "ruler"`])
      .then(output => {
        assert.notOk(output)
        assert.end()
      })
      .catch(err => {
        assert.notOk(err, `this should never be evaluated`)
        assert.end()
      })
  })

  assert.test(`error should be caught`, assert => {
    node(`notavalidarg`)
      .then(r => {
        assert.notOk(r, `this should never be evaluated`)
        assert.end()
      })
      .catch(e => {
        assert.ok(e)
        assert.end()
      })
  })

  assert.test(`error should be caught`, assert => {
    node([`-e`, `process.exit(1)`])
      .then(r => {
        assert.notOk(r, `this should never be evaluated`)
        assert.end()
      })
      .catch(e => {
        assert.ok(e)
        assert.end()
      })
  })

  assert.test(`error should be caught`, assert => {
    node([`-e`, `process.stderr.write("bad stuff")`])
      .then(r => {
        assert.notOk(r, `this should never be evaluated`)
        assert.end()
      })
      .catch(e => {
        assert.equal(e, `bad stuff`)
        assert.end()
      })
  })

  assert.test(`expected output`, assert => {
    node([`-e`, `process.stdout.write("success")`])
      .then(r => {
        assert.equal(r, `success`)
        assert.end()
      })
      .catch(e => {
        assert.notOk(e, `this should never be evaluated`)
        assert.end()
      })
  })

  assert.test(`expected output`, assert => {
    node(
      [`-e`, `process.stdout.write(process.cwd())`],
      { cwd: process.cwd() }
    )
      .then(r => {
        assert.equal(r, process.cwd())
        assert.end()
      })
      .catch(e => {
        assert.notOk(e)
        assert.end()
      })
  })

  assert.test(`expected output`, assert => {
    node(
      [`-e`, `process.stdout.write(process.cwd())`],
      { cwd: process.cwd(), maxBuffer: 200 * 1024 }
    )
      .then(r => {
        assert.equal(r, process.cwd())
        assert.end()
      })
      .catch(e => {
        assert.notOk(e)
        assert.end()
      })
  })

  assert.test(`define options during binding`, assert => {
    const otherNode = exec(`node`, { cwd: process.cwd() })

    otherNode([`-e`, `process.stdout.write(process.cwd())`])
      .then(r => {
        assert.equal(r, process.cwd())
        assert.end()
      })
      .catch(e => {
        assert.notOk(e)
        assert.end()
      })
  })

  assert.test(`binding to non existing binary`, assert => {
    const missingCommand = exec(`thisShouldNotExistWouldBeWeirdIfItDid`)

    missingCommand()
      .then(r => {
        assert.notOk(r, `this should never be evaluated`)
        assert.end()
      })
      .catch(e => {
        assert.ok(e, `got an error`)
        assert.end()
      })
  })

  assert.test(`empty invocation`, assert => {
    assert.throws(() => exec())
    assert.end()
  })

  assert.end()
})
