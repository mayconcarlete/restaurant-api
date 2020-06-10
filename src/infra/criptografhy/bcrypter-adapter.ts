import { IEncrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcrypterAdapter implements IEncrypter {
  private readonly salt
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, this.salt)
    return passwordHash
  }
}
