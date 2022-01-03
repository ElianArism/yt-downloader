const ytdl = require("ytdl-core")
const ffmpeg = require("fluent-ffmpeg")
/**
 * Retrieve the URL of a file, download
 * to the server and convert it into "mp3" format
 * to pass it on to the client later.
 * @param {string} url - Video url
 */
const downloadAndConvertAudio = (url) => {
  return new Promise(async (resolve, reject) => {
    const info = await ytdl.getInfo(url)
    const proc = new ffmpeg({
      source: ytdl(url, {
        quality: "highestaudio",
      }),
    })
    proc
      .setFfmpegPath(process.env.FFMPEG)
      .toFormat("mp3")
      .on("error", reject)
      .on("end", () => {
        resolve(info.videoDetails.title)
      })
      .save(`./${info.videoDetails.title}.mp3`)
  })
}

module.exports = {
  downloadAndConvertAudio,
}
