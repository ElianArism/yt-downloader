const fs = require("fs")
const path = require("path")
const ytdl = require("ytdl-core")
const { request, response } = require("express")
const { downloadFile } = require("../utils/downloadFile")
const { retrieveFileInformation } = require("../utils/fileInformation")

const downloadVideo = async (req = request, res = response) => {
  const { url } = req.body
  try {
    const info = await retrieveFileInformation(url, res)
    ytdl(url)
      .pipe(fs.createWriteStream(`${info.videoDetails.title}.mp4`))
      .on("finish", () => {
        const filePath = path.join(process.cwd(), "/" + `${info.videoDetails.title}.mp4`)
        return res.download(filePath, (err) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              message: "Download file err.",
              logs: err,
            })
          } else {
            fs.unlinkSync(filePath)
          }
        })
      })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Sv Error.",
      logs: error,
    })
  }
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
      fs.unlinkSync(filePath)
    }
  })
}

const getFileInformation = async (req = request, res = response) => {
  const { url } = req.body
  const info = await retrieveFileInformation(url, res)
  return res.json({
    status: 200,
    message: "File information founded.",
    data: info,
  })
}

module.exports = {
  takeFile,
  downloadVideo,
  downloadAudio,
  getFileInformation,
}
