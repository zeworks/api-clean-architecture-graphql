export class UserInvalidError extends Error {
  constructor() {
    super('User Invalid Error')
    this.name = "UserInvalidError"
  }
}
