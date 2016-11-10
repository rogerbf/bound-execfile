import { execFile } from 'child_process'

export default (
  command = undefined,
  options = {
    maxBuffer: 1000 * 1000 * 10
  }
) =>
  (args = [], options = options) =>
    new Promise(
      (resolve, reject) =>
        execFile(command, [].concat(args), options, (err, stdout, stderr) => {
          if (err) {
            stderr.length > 0
            ? reject(stderr.trim())
            : reject(err)
          } else {
            stdout.length > 0
            ? resolve(stdout.toString().trim())
            : resolve()
          }
        })
    )
