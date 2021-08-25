import { User } from "./user";

export type Session = User & {
  accessToken: string | null
}
