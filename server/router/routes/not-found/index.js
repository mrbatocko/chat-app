const fs = require('fs')

module.exports = (req, res) => {
  let fileStream = fs.createReadStream(`${process.cwd()}/server/static/not-found.html`)
  fileStream.pipe(res)
}
