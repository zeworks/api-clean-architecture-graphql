import { makeCreateUserController } from '@/main/factories/user'
import { routerAdapter } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', routerAdapter(makeCreateUserController()))
}
