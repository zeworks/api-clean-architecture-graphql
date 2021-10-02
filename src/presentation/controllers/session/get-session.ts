import { LoadSessionByTokenRepository } from "@/data/protocols/db";
import { LoadSessionTokenService } from "@/data/services/session";
import { ServerError } from "@/presentation/errors";
import { badRequest, forbidden, ok } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class GetSessionController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadSessionTokenService: LoadSessionTokenService
  ) { }

  async handle(_: any, context: any): Promise<HttpResponse<LoadSessionByTokenRepository.Result>> {
    const headers = context.req.headers;
    // validate request
    const errors = this.validation.validate(headers);
    if (errors) return badRequest(errors);

    const token = headers.authorization?.split(" ")[1];

    // get the session
    const session = await this.loadSessionTokenService.load(token);

    // response
    if (session) return ok(session)

    return forbidden(new ServerError());
  }
}
