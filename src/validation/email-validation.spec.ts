import { EmailValidation } from './email-validation'
import { IEmailValidation } from '../presentation/protocols'
import * as emailValidator from 'email-validator'

jest.mock('email-validator', () => ({
  validate: jest.fn()
}))

const makeSut = (): IEmailValidation => {
  const emailValidation = new EmailValidation()
  return emailValidation
}

describe('Test EmailValidation class', () => {
  test('Ensure EmailValidation returns true if validate return true', () => {
    const sut = makeSut()
    jest.spyOn(emailValidator, 'validate').mockReturnValueOnce(true)
    const response = sut.validation('valid_mail@mail.com')
    expect(response).toBe(true)
  })
  test('Ensure EmailValidation return false if validate returns false', () => {
    const sut = makeSut()
    jest.spyOn(emailValidator, 'validate').mockReturnValueOnce(false)
    const response = sut.validation('invalid_mail@mail.com')
    expect(response).toBe(false)
  })
  test('Ensure validation will be called with correct values', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(emailValidator, 'validate')
    sut.validation('any_mail@mail.com')
    expect(validatorSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
