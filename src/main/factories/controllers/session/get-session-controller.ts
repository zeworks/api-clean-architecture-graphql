import { LoadSessionTokenService } from "@/data/services/session";
import { SessionRepository } from "@/infra/repositories/session";
import { GetSessionController } from "@/presentation/controllers/session";
import { Controller } from "@/presentation/protocols";
import { makeGetSessionValidation } from "./get-session-validation";

export const makeGetSessionController = (): Controller => {
  const sessionRepository = new SessionRepository()
  const sessionService = new LoadSessionTokenService(sessionRepository);
  return new GetSessionController(makeGetSessionValidation(), sessionService);
}
