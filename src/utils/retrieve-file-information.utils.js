const { response } = require("express")
const ytdl = require("ytdl-core")
/**
 * Retrieve all the information from a file by url.
 * @param {string} url file url
 * @param {response} res - Express.Response
 * @returns {any} - file information
 */
const retrieveFileInformation = async (url, res = response) => {
  try {
    const info = await ytdl.getInfo(url)
    if (!info) {
      return res.status(404).json({
        status: 404,
        message: "File Information not found.",
      })
    }
    return info
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Get File Information error.",
      logs: error,
    })
  }
}

module.exports = {
  retrieveFileInformation,
}
