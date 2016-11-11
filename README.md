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

Using this module without setting any options gives you an increased `maxBuffer` of 10 megabytes. It is possible to override that value and/or pass other options to the underlaying `execFile` call:

```javascript
const node = exec(`node`, { maxBuffer: 200 * 1024, cwd: `/private/tmp` })

// alternatively

const node = exec(`node`)
const args = [`-e`, `process.stdout.write("the humans are dead")`]
const options = { cwd: `/some/dir` }
node(args, options).then(/*...*/).catch(/*...*/)
```
