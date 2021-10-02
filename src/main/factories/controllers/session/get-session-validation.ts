import { ValidationComposite, RequiredHeaderValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeGetSessionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['authorization']) {
    validations.push(new RequiredHeaderValidation(field))
  }
  return new ValidationComposite(validations)
}
