import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'
import { JwtAdapter } from '@/infra/adapters'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET);
  return new AuthMiddleware(jwtAdapter, role)
}
