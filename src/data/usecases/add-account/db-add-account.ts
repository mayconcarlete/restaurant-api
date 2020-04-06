import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocol/encrypter'
export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  async add (account: AddAccountModel): Promise<AccountModel> {
    // eslint-disable-next-line @typescript-eslint/return-await
    await this.encrypter.encrypt(account.password)
    return await new Promise(resolve => resolve(null))
  }
}
