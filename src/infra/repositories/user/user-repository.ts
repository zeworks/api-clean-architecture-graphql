import {
  CreateUserRepository,
  DeleteUserRepository,
  LoadUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
  GetUsersRepository
} from '@/data/protocols/db'
import { db } from '@/infra/db'

export class UserRepository implements CreateUserRepository, UpdateUserRepository, DeleteUserRepository, LoadUserByEmailRepository, GetUserByIdRepository, GetUsersRepository {
  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const user = await db.user.create({
      data: {
        ...input,
        roles: {
          connect: input.roles?.map(role => ({
            id: role || role || 0
          }))
        },
        permissions: {
          connect: input.permissions?.map(permission => ({
            id: permission || 0
          })),
        }
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
          connect: data.roles?.map((role: any) => ({
            id: role.id || role || 0
          }))
        },
        permissions: {
          set: data.permissions ? [] : undefined, // clean the previous permissions
          connect: data.permissions?.map((permission: any) => ({
            id: permission.id || permission || 0
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

  // load user by email
  async load(email: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }

  /**
   * Get user by id
   * @param uuid 
   * @returns 
   */
  async get(uuid: string): Promise<GetUserByIdRepository.Result> {
    const user = await db.user.findUnique({ where: { uuid }, include: { permissions: true, roles: true } });
    return user;
  }

  /**
   * Get Users
   * @returns Array of Users
   */
  async getUsers(): Promise<GetUsersRepository.Result> {
    const users = await db.user.findMany({ include: { permissions: true, roles: true } });
    return users
  }
}
