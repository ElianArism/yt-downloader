const { Router } = require("express")
const { downloadVideo, downloadVideo2 } = require("../controllers/downloader.controller")
const { validateBody } = require("../middlewares/validate-body.middleware")

const downloaderRoutes = Router()

downloaderRoutes.head("/server")
downloaderRoutes.post("/download", downloadVideo2)

module.exports = downloaderRoutes
