const { response } = require("express")
const fs = require("fs")
const path = require("path")

const directory = process.cwd()

const deleteFiles = (res = response) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return res.json({
        status: 500,
        message: "Delete files err.",
        logs: err,
      })
    }

    for (const file of files) {
      if (file.includes(".mp3") || file.includes(".mp4")) {
        fs.unlinkSync(path.join(directory, file))
      }
    }
  })
}

module.exports = {
  deleteFiles,
}
