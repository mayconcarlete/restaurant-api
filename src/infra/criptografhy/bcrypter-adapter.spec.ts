import { BcrypterAdapter } from './bcrypter-adapter'
import bcrypt from 'bcrypt'
const salt = 12

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

const makeSut = (): BcrypterAdapter => {
  return new BcrypterAdapter(salt)
}

describe('Tests for bcrypter adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const passwordHash = await sut.encrypt('any_value')
    expect(passwordHash).toBe('hash')
  })
  test('Should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
