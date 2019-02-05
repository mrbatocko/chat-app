// Server entry file

const http = require('http')

const mainHandler = require('./router')

const server = http.createServer(mainHandler)

server.listen(8080)