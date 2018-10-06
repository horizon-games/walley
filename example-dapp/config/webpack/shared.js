const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

// appEnvVars loads the dotenv file in either client or server mode. This function
// is intended to be used as the argument to `new webpack.DefinePlugin()`.
// The app environment variables are embedded into the build for the dev or dist
// releases, however on the server, the variables can be overriden through system
// environment variables, ie. NODE_DEV=staging node dist/server
exports.appEnvVars = (envfile, opts = { server: false }) => {
  const env = {}
  const contents = fs.readFileSync(path.join(process.cwd(), envfile))
  const vars = dotenv.parse(contents)

  Object.keys(vars).forEach((key) => {
    if (opts.server) {
      env['process.env.' + key] = `process.env.${key} || '${vars[key]}'`
    } else {
      env['process.env.' + key] = `'${vars[key]}'`
    }
  })

  return env
}

