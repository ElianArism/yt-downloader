const ytdl = require("ytdl-core")
const { downloadFile } = require("../utils/downloadFile")
const { request, response } = require("express")
const fs = require("fs")
const path = require("path")

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

const takeFile = async (req = request, res = response) => {
  const { url } = req.body
  try {
    const fileName = await downloadFile(url)
    return res.json({
      status: 200,
      message: "File ready for download",
      data: fileName,
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Download File err.",
      logs: err,
    })
  }
}

const downloadAudio = async (req = request, res = response) => {
  const fileName = req.headers.filename ?? null
  if (!fileName) {
    return res.status(400).json({
      status: 400,
      message: "Error, headers.fileName needed.",
      logs: null,
    })
  }
  const filePath = path.join(process.cwd(), "/" + fileName + ".mp3")
  return res.download(filePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Download file err.",
        logs: err,
      })
    } else {
      console.log(err)
      fs.unlinkSync(filePath)
      return
    }
  })
}

const getFileInformation = async (req = request, res = response) => {
  const { url } = req.body
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Url is required.",
    })
  }
  try {
    const info = await ytdl.getInfo(url)
    if (!info) {
      return res.status(404).json({
        status: 404,
        message: "File Information not found.",
      })
    }
    return res.json({
      status: 200,
      message: "File information founded.",
      data: info,
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Get File Information error.",
      logs: error,
    })
  }
}

module.exports = {
  takeFile,
  downloadVideo,
  downloadAudio,
  getFileInformation,
}
