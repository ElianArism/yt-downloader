const fs = require("fs")
const path = require("path")
const ytdl = require("ytdl-core")
const { request, response } = require("express")
const { downloadAndConvertAudio } = require("../utils/download-and-convert-audio.utils")
const { retrieveFileInformation } = require("../utils/retrieve-file-information.utils")

/**
 * Retrieve the URL of a file, download
 * to the server and pass it on to the client later.
 * @param {request} req - Express.Request
 * @param {response} res - Express.Response
 * @returns {response} - {
      status: 200,
      message: "File ready for download",
      data: { fileName, fileExt: ".mp4" },
    }
 */
const takeVideo = async (req = request, res = response) => {
  const { url } = req.body
  try {
    const info = await retrieveFileInformation(url, res)
    ytdl(url)
      .pipe(fs.createWriteStream(`${info.videoDetails.title}.mp4`))
      .on("finish", () => {
        return res.json({
          status: 200,
          message: "File ready for download",
          data: { fileName: info.videoDetails.title, fileExt: ".mp4" },
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
/**
 * Retrieve the URL of a file, download
 * to the server and convert it into "mp3" format
 * to pass it on to the client later.
 * @param {request} req - Express.Request
 * @param {response} res - Express.Response
 * @returns {response} - {
      status: 200,
      message: "File ready for download",
      data: { fileName, fileExt: ".mp3" },
    }
 */
const takeAudio = async (req = request, res = response) => {
  const { url } = req.body
  try {
    const fileName = await downloadAndConvertAudio(url)
    return res.json({
      status: 200,
      message: "File ready for download",
      data: { fileName, fileExt: ".mp3" },
    })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Download File err.",
      logs: err,
    })
  }
}
/**
 * Retrieve a file's options passed in req.headers
 * and returns the file to download.
 * @param {request} req - Express.Request
 * @param {response} res - Express.Response
 * @returns {response} - File to download
 */
const getFileToDownload = async (req = request, res = response) => {
  const fileOpts = req.headers.file_opts ? JSON.parse(req.headers.file_opts) : null
  const headersErr = {
    status: 400,
    message: "Error, headers.fileOpts.fileName & headers.fileOpts.fileExt needed.",
    logs: null,
  }
  if (!fileOpts) return res.status(400).json(headersErr)
  const { fileName, fileExt } = fileOpts
  if (!fileName || !fileExt) return res.status(400).json(headersErr)
  const filePath = path.join(process.cwd(), "/" + fileName + fileExt)
  return res.download(filePath, (err) => {
    fs.unlinkSync(filePath)
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Download file err.",
        logs: err,
      })
  })
}
/**
 * Retrieve all the information from a file by url.
 * @param {request} req - Express.Request
 * @param {response} res - Express.Response
 * @returns {response} - {
    status: 200,
    message: "File information founded.",
    data: File information,
  } 
 */
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
  takeAudio,
  takeVideo,
  getFileToDownload,
  getFileInformation,
}
