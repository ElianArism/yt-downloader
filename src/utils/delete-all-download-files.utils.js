const glob = require("glob")
const fs = require("fs")

/**
 * Delete all files with .mp3 or .mp3 ext
 * @returns {any} - {
 *  ok: {boolean} status
 *  err: {any} logs
 * }
 */
const deleteAllFiles = (ext) => {
  glob(`**/*.${ext}`, (err, files) => {
    if (err) {
      return {
        ok: false,
        err,
      }
    }
    for (const file of files) {
      fs.unlinkSync(file, (err) => {
        if (err) {
          return {
            ok: false,
            err,
          }
        }
      })
    }
  })
}

module.exports = {
  deleteAllFiles,
}
