import { Controller } from '@/presentation/protocols'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adaptResolver = async <ArgsType = any, ContextType = any>(controller: Controller, args?: ArgsType, context?: ContextType): Promise<any> => {
  const request = {
    ...(args || {}),
  }
  const httpResponse = await controller.handle(request)

  return httpResponse.data
}
