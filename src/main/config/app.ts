import express from 'express'
import { setupRoutes } from './routes'
import { setupApolloServer } from './apollo-server'

const app = express()
setupRoutes(app)
setupApolloServer(app)
export default app
