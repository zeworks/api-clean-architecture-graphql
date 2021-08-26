import { Base } from "./base"
import { Permission } from "./permission"
import { Role } from "./role"

export type User = Base & {
  uuid: string;
  email: string;
  firstName: string;
  lastName?: string | null;
  avatarUrl?: string | null;
  active: boolean;
  password: string;
  accessToken?: string | null;
  roles?: Role[]
  permissions?: Permission[]
}
