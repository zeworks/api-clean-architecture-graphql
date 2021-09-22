import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import {
  CreateSessionRepository,
  LoadUserByEmailRepository,
  UpdateSessionTokenRepository
} from '@/data/protocols/db'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { badRequest, ok } from '@/presentation/helpers'
import { CreateSessionViewModel } from '@/presentation/view-models/session'
import { UserInvalidError } from '@/presentation/errors'
import { validateRequiredFields } from '@/utils/validators/required-fields-validator'
import { BadRequestError } from '@/presentation/errors/bad-request'

export class CreateSessionController implements Controller {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateSessionTokenRepository: UpdateSessionTokenRepository,
  ) { }

  async handle(request: CreateSessionRepository.Params): Promise<HttpResponse<CreateSessionViewModel>> {
    // validate required fields
    const isValid = validateRequiredFields(request, ["email", "password"]);
    if (!isValid) return badRequest(new BadRequestError());

    // validate if the exists
    const user = await this.loadUserByEmailRepository.loadUserByEmail(request.email);
    if (!user) throw new UserInvalidError();

    // compare the password
    const isPasswordValid = await this.hasComparer.compare(request.password, user.password)
    if (!isPasswordValid) throw new UserInvalidError();

    // encrypting the new access token
    const token = await this.encrypter.encrypt(user.uuid);

    // update the user access token into the DB
    const session = await this.updateSessionTokenRepository.updateSessionToken({ token, id: user.uuid })

    // returns the session
    return ok(session);
  }
}
