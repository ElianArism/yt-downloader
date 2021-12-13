const ytdl = require("ytdl-core")
const { downloadFile } = require("../utils/downloadFile")
const { request, response } = require("express")
const fs = require("fs")
const path = require("path")
const { deleteFiles } = require("../utils/deleteFiles")

const downloadVideo = (req = request, res = response) => {
  const { url } = req.body

  ytdl(url)
    .pipe(fs.createWriteStream(downloadedVideo))

    .on("finish", function (res) {
      console.log(res)
    })

  return res.json({
    ok: true,
    msg: "Hello",
  })
}

const downloadVideo2 = async (req = request, res = response) => {
  const { url } = req.body

  try {
    const data = await downloadFile(url)
    deleteFiles(res)
    return res.sendFile(path.join(process.cwd(), "/" + data + ".mp3"))
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  downloadVideo,
  downloadVideo2,
}
