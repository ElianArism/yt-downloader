const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const downloaderRoutes = require("./src/routes/downloader.routes.js")

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/", downloaderRoutes)

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/src/public/index.html`)
})

app.listen(port, () => {
  console.log(`Server up on port: ${port}!`)
})
