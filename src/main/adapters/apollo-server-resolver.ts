import { Controller } from '@/presentation/protocols'
import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-errors'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adaptResolver = async <ArgsType = any, ContextType = any>(controller: Controller, args?: ArgsType, cntxt?: any): Promise<any> => {
  const request = {
    ...(args || {}),
  }

  const context = {
    ...(cntxt || {}),
  }

  const httpResponse = await controller.handle(request, context);

  switch (httpResponse.statusCode) {
    case 200:
    case 204: return httpResponse.data
    case 400: throw new UserInputError(httpResponse.data.message)
    case 401: throw new AuthenticationError(httpResponse.data.message)
    case 403: throw new ForbiddenError(httpResponse.data.message)
    default: throw new ApolloError(httpResponse.data.message)
  }
}
