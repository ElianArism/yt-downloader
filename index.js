const express = require("express")
const cors = require("cors")
const downloaderRoutes = require("./src/routes/downloader.routes.js")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/download", downloaderRoutes)

app.listen(port, () => {
  console.log("Server up!")
})
