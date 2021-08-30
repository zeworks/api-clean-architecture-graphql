import { UUID } from '@/data/protocols/cryptography'
import { uuid } from 'uuidv4'

export class UUIDAdapter implements UUID {
  async generate(): Promise<string> {
    return uuid()
  }
}
