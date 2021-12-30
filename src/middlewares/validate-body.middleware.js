const { request, response } = require("express")

/**
 * Middleware to validate property url.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const validateBody = (req = request, res = response, next) => {
  const { url } = req.body
  if (url && url.trim().length) {
    req.body = { ...req.body, url: url.trim() }
  } else {
    return res.status(400).json({
      status: 400,
      message: "Property url is required.",
    })
  }
  next()
}

module.exports = {
  validateBody,
}
