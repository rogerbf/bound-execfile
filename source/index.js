import { execFile } from 'child_process'

const defaultOptions = { maxBuffer: 1000 * 1000 * 10 }

export default (command = undefined, options = defaultOptions) => {
  if (!command) { throw new Error(`missing argument: command`) }

  return (args = [], options = options) => new Promise((resolve, reject) =>
    execFile(command, [].concat(args), options, (err, stdout, stderr) => {
      if (err) {
        stderr.length > 0 ? reject(stderr.toString().trim()) : reject(err)
      } else {
        stdout.length > 0 ? resolve(stdout.toString().trim()) : resolve()
      }
    })
  )
}
