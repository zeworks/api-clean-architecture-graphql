export class ServerError extends Error {
  constructor(stack?: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.message = "Internal server Error"
    this.stack = stack
  }
}
