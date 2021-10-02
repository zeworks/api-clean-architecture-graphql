import { Validation } from '@/presentation/protocols'
import { FieldMissingError } from '@/presentation/errors'

export class RequiredHeaderValidation implements Validation {
  constructor(private readonly headerName: string) { }

  validate(input: any): Error {
    if (!input[this.headerName]) {
      return new FieldMissingError(this.headerName)
    }
  }
}
