import { Middleware } from '@/presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      authorization: req.headers?.['authorization'],
      ...(req.headers || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.data)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      })
    }
  }
}
