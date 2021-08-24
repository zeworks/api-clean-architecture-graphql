import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { db } from '@/infra/db'
import { UserExistsError } from '@/infra/errors/user';
import { v4 as uuidv4 } from 'uuid'

export class UserRepository implements CreateUserRepository, LoadUserByEmailRepository {
  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {

    // validate if the user already exists
    const userAlreadyExists = !!await db.user.findUnique({ where: { email: input.email } });
    if (userAlreadyExists) throw new UserExistsError()

    const user = await db.user.create({
      data: {
        ...input,
        password: 'teste',
        uuid: uuidv4()
      }
    })

    return user
  }

  async loadUserByEmail(email: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  }
}
