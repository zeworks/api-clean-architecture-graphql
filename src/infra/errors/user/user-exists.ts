export class UserExistsError extends Error {
  constructor() {
    super('User Already Exists')
    this.name = 'UserExistsError'
  }
}
