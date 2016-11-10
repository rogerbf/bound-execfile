# bound-execfile

`child_process.execFile` bound to a command with trimmed output and promise support.

## usage

```javascript
import exec from 'bound-execfile'

const node = exec(`node`)

node(`--version`)
  .then(version => console.log(version))
  .catch(err => console.log(err))

node([`-e`, `process.stdout.write("growling")`])
  .then(output => console.log(output))
  .catch(err => console.log(err))
```

## options

Per default `maxBuffer` is increased to 10 megabytes, it is possible to override that and/or pass other options to the underlying `execFile`-call.

```javascript
const node = exec(`node`, { cwd: `/private/tmp` })
```
