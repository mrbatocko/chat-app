const fs = require('fs')

module.exports = {
  '/': (req, res) => {
    let fileStream = fs.createReadStream(`${process.cwd()}/server/static/index.html`)
    fileStream.pipe(res)
    // res.end('need to serve index.html')
  },
  '/app.js': (req, res) => {
    res.end('need to serve app.js')
  }
}
