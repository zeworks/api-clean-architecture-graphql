import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { db } from '@/infra/db'
import { v4 as uuidv4 } from 'uuid'

export class UserRepository implements CreateUserRepository, LoadUserByEmailRepository {
  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const user = await db.user.create({
      data: {
        ...input,
        uuid: uuidv4(),
        permissions: {
          connect: input.permissions?.map(permission => ({
            id: permission || 0
          }))
        },
        roles: {
          connect: input.roles?.map(role => ({
            id: role || 0
          }))
        }
      },
      include: {
        permissions: true,
        roles: true
      }
    })
    return user
  }

  async loadUserByEmail(email: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }
}
