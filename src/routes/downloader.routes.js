const { Router } = require("express")

const {
  downloadVideo,
  downloadAudio,
  takeFile,
  getFileInformation,
} = require("../controllers/downloader.controller")

const { validateBody } = require("../middlewares/validate-body.middleware")

const downloaderRoutes = Router()

downloaderRoutes.head("/server")
downloaderRoutes.post("/take-file", takeFile)
downloaderRoutes.post("/file-information", getFileInformation)
downloaderRoutes.get("/download", downloadAudio)

module.exports = downloaderRoutes
