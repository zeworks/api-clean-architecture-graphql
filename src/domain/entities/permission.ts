import { Base } from "./base";

export type Permission = Base & {
  key: string;
  parent?: number | null;
}
