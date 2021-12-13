const ytdl = require("ytdl-core")
const ffmpeg = require("fluent-ffmpeg")

const downloadFile = (url) => {
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
      .on("progress", (progress) => {
        console.log("Processing: " + progress.targetSize + " KB converted")
      })
      .on("end", () => {
        resolve(info.videoDetails.title)
      })
      .save(`./${info.videoDetails.title}.mp3`)
  })
}

module.exports = {
  downloadFile,
}
