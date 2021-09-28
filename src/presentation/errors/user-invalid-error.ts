export class UserInvalidError extends Error {
  constructor() {
    super('User Invalid Error')
    this.name = "UserInvalidError"
    this.message = "User Invalid"
    this.stack = "UserInvalidError"
  }
}
