import { UserModel } from "@/data/models";

export type GetUsersViewModel = Pick<
  UserModel,
  "firstName" | "lastName" | "uuid" | "active" | "avatarUrl" | "createdAt" | "updatedAt" | "email" | "roles" | "permissions"
>
