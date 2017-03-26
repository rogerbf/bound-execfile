const required = () => {
  throw Error(`missing argument: file`)
}

module.exports = ({ execFile, args }, file = required(), configuration = {}) =>
  (...params) => execFile(
    file,
    Object.keys(configuration.args || {})
    .reduce(
      (computed, method) => computed[method](configuration.args[method]),
      args
    )(typeof (params[0]) === `object` ? params[0] : {}),
    configuration.options || {},
    params[params.length - 1]
  )
