const boundExecFile = require(`./bound-execfile`)
const args = require(`options-to-args`)

it(`is a function`, () => {
  expect(typeof (boundExecFile)).toBe(`function`)
})

it(`calls execFile with the expected arguments`, () => {
  const callback = jest.fn((error, stdout, stderr) => {
    expect(error).toEqual(null)
    expect(stdout).toEqual(`success`)
    expect(execFile).toHaveBeenCalledWith(
      `node`,
      [ `-some`, `arg` ],
      { an: `option` },
      callback
    )
  })

  const execFile = jest.fn(
    (file, args, options, callback) => callback(null, `success`)
  )

  boundExecFile(
    { execFile, args },
    `node`,
    {
      options: { an: `option` },
      args: { prefix: `-` }
    })({ some: `arg` }, callback)
})

it(`throws when called without a file`, () => {
  const execFile = jest.fn()
  expect(() => boundExecFile({ execFile, args })).toThrowError(`missing argument: file`)
})

it(`calls execFile with default arguments`, () => {
  const execFile = jest.fn(
    (file, args, options, callback) => callback(null, `success`)
  )
  const callback = jest.fn((error, stdout, stderr) => {
    expect(error).toEqual(null)
    expect(stdout).toEqual(`success`)
    expect(execFile).toHaveBeenCalledWith(`node`, [], {}, callback)
  })

  boundExecFile({ execFile, args }, `node`)(callback)
})
