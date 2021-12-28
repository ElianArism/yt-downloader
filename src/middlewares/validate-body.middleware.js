const { request, response } = require("express")

const validateBody = (req = request, res = response, next) => {
  const { url } = req.body

  if (url && url.trim().length) {
    req.body = { ...req.body, url: url.trim() }
  }

  next()
}

module.exports = {
  validateBody,
}
