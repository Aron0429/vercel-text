exports.injectHref = (req, res, next) => {
  res.locals.href = req.originalUrl
  next()
}
