# bound-execfile

Bind `child_process.execFile` to a file and configuration.

## usage

```javascript
const node = require(`bound-execfile`)(
  `node`,
  {
    args: {
      prefix: `-`,
      alias: {
        eval: `e`
      }
    }
  }
)

node({ eval: `console.log('hello')` }, (error, stdout, stderr) => {
  console.log(stdout.toString())
})
```

## api

### `boundExecFile(file[, configuration])`

- `file` - &lt;string&gt; the name or path of the executable file to run
- `configuration` - &lt;Object&gt;
  - `args` - &lt;Object&gt; configure [options-to-args](https://www.npmjs.com/package/options-to-args)
    - `prefix` - &lt;string&gt;
    - `alias` - &lt;Object&gt;
    - `behaviour` - &lt;Object&gt;
  - options - &lt;Object&gt; same as the options object in the documentation for [child_process.execFile](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback).

Returns a function with the following signature:

`fn([options], callback)`

- `options` - &lt;Object&gt; passed on to [options-to-args](https://www.npmjs.com/package/options-to-args)
- `callback` - mirrors the callback signature as described in the Node.js documentation for `child_process.execFile`

Returns &lt;ChildProcess&gt;

### `.args`

The [options-to-args](https://www.npmjs.com/package/options-to-args) module
