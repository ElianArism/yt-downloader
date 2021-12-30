const { Router } = require("express")

const {
  downloadVideo,
  downloadAudio,
  takeFile,
  getFileInformation,
} = require("../controllers/downloader.controller")

const { validateBody } = require("../middlewares/validate-body.middleware")

const downloaderRoutes = Router()
// HEAD Routes
downloaderRoutes.head("/server")
// POST Routes
downloaderRoutes.post("/take-file", validateBody, takeFile)
downloaderRoutes.post("/file-information", validateBody, getFileInformation)
downloaderRoutes.post("/download-video", validateBody, downloadVideo)
// GET Routes
downloaderRoutes.get("/download", downloadAudio)

module.exports = downloaderRoutes
