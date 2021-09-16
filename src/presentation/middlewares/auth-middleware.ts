import { Decrypter } from "@/data/protocols/cryptography";
import { UnauthorizedError } from "../errors";
import { forbidden, ok, serverError } from "../helpers";
import { HttpResponse } from "../protocols";
import { Middleware } from "../protocols/middleware";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly role?: string
  ) { }

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { authorization } = request;

      if (authorization) {
        const payload = await this.decrypter.decrypt(authorization.split(" ")[1]);

        if (payload) {
          return ok({
            payload
          })
        }
        return forbidden(new UnauthorizedError())
      }

      return forbidden(new UnauthorizedError())
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    authorization?: string;
  }
}
