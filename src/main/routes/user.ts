import { makeCreateUserController, makeUpdateUserController } from '@/main/factories/controllers'
import { routerAdapter } from '@/main/adapters'
import { Router } from 'express'
import { adminAuth } from '../middlewares/admin-auth-middleware'

export default (router: Router): void => {
  router.post('/users', adminAuth, routerAdapter(makeCreateUserController()))
  router.put('/user', adminAuth, routerAdapter(makeUpdateUserController()))
}
