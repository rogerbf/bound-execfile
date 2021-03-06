const { execFile } = require(`child_process`)
const args = require(`options-to-args`)
const boundExecFile = require(`./bound-execfile`)

module.exports = Object.assign(
  boundExecFile.bind(null, { execFile, args }),
  { args }
)
