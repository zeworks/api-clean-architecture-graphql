import { Controller } from '@/presentation/protocols'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const adaptResolver = async (controller: Controller, args?: any, context?: any): Promise<any> => {
  const request = {
    ...(args || {}),
  }
  const httpResponse = await controller.handle(request)

  return httpResponse.data
}
