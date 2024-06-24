const checkRoute = (req, res, next) => {

  if (req.method === 'GET' && req.url.length > 1)
    return res.json({
      error_code: 5,
      error_desc: 'Ruta aún no implementada',
      endpoint: req.originalUrl,
      method: req.method
    })

  next()
}



export const middlewares = {
  checkRoute
}