const { request, response } = require("express")

const validateBody = (req = request, res = response, next) => {
  const { url, type } = req.body

  if (url && url.trim() && type && type.trim()) {
    req.body = { ...req.body, url: url.trim(), type: type.trim() }
  }

  next()
}

module.exports = {
  validateBody,
}
