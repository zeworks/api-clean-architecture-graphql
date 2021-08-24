import { Decrypter, Encrypter } from "@/data/protocols/cryptography";
import jwt from "jsonwebtoken"

export class JwtAdapter implements Decrypter, Encrypter {
  constructor(private readonly secret: string) { }

  async decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as string
  }

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }
}
