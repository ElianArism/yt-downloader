const { Router } = require("express")
const {
  takeAudio,
  takeVideo,
  serverStatus,
  getFileToDownload,
  getFileInformation,
} = require("../controllers/downloader.controller")
const { validateBody } = require("../middlewares/validate-body.middleware")

const downloaderRoutes = Router()
// HEAD Routes
downloaderRoutes.head("/server", serverStatus)
// POST Routes
downloaderRoutes.post("/take-audio", validateBody, takeAudio)
downloaderRoutes.post("/take-video", validateBody, takeVideo)
downloaderRoutes.post("/file-information", validateBody, getFileInformation)
// GET Routes
downloaderRoutes.get("/download", getFileToDownload)

module.exports = downloaderRoutes
