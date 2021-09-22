import {
  CreateUserRepository,
  DeleteUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  UpdateUserRepository
} from '@/data/protocols/db'
import { db } from '@/infra/db'

export class UserRepository implements CreateUserRepository, UpdateUserRepository, DeleteUserRepository, LoadUserByEmailRepository, LoadUserByIdRepository {
  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const user = await db.user.create({
      data: {
        ...input
      },
      include: {
        permissions: true,
        roles: true
      }
    })
    return user
  }

  async update({ input: data, id }: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    const user = await db.user.update({
      data: {
        active: data.active,
        avatarUrl: data.avatarUrl,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        roles: {
          set: data.roles ? [] : undefined, // clean the previous roles
          connect: data.roles?.map(role => ({
            id: role || 0
          }))
        },
        permissions: {
          set: data.permissions ? [] : undefined, // clean the previous permissions
          connect: data.permissions?.map(permission => ({
            id: permission || 0
          })),
        }
      },
      where: {
        uuid: id
      },
      include: {
        permissions: true,
        roles: true
      }
    })
    return user
  }

  async delete(id: string): DeleteUserRepository.Result {
    const result = await db.user.update({
      data: {
        active: false
      },
      where: {
        uuid: id
      }
    })
    return !!result
  }

  async loadUserByEmail(email: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }

  async loadUserById(uuid: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    const user = await db.user.findUnique({ where: { uuid } });
    return user;
  }
}
