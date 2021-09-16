import { json } from 'body-parser'
import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  app.use(json())
  app.use('/v1', router)

  readdirSync(`${__dirname}/../routes`).map(async fileName => {
    (await import(`../routes/${fileName}`)).default(router)
  })
}
