const jsonApiRoutes = require('./routes/json-api')
const rootRoutes = require('./routes/root')
const notFound = require('./routes/not-found')

const handlers = {
  ...jsonApiRoutes, ...rootRoutes
}

const mainHandler = (req, res) => {
  if (handlers[req.url]) {
    handlers[req.url](req, res)
  } else {
    notFound(req, res)
  }
}

module.exports = mainHandler
