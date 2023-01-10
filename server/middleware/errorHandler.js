const NotFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  res.status(404)
  next(error)
}
const ErrorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode
  res.status(statuscode)
  res.json({
    message: err?.message,

  })
}
export {NotFound, ErrorHandler}