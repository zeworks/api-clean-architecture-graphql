import { Controller } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const routerAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req.body)
    res.status(httpResponse.statusCode).json(httpResponse.data)
  }
}
