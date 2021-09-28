import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeCreateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['firstName', "email", 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
