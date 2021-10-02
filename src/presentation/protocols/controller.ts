import { HttpResponse } from './http'

export interface Controller<T = any, C = any> {
  handle: (request?: T, context?: C) => Promise<HttpResponse>
}
