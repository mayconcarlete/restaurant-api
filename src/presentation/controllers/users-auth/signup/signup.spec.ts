import { SignUpController } from './signup'
import { IHttpRequest, MissingParamError } from './signup-protocols'
import { InvalidParamError } from '../../../errors'
import { IEmailValidation } from '../../../protocols'
import { EmailValidation } from '../../../../validation/email-validation'

const makeEmailValidationStub = (): IEmailValidation => {
  class EmailValidationStub implements IEmailValidation {
    validation (email: string): boolean {
      return true
    }
  }
  return new EmailValidationStub()
}
interface IMakeSut{
  sut: SignUpController
  emailValidationStub: EmailValidation
}
const makeSut = (): IMakeSut => {
  const emailValidationStub = makeEmailValidationStub()
  const sut = new SignUpController(emailValidationStub)
  return {
    sut,
    emailValidationStub
  }
}
describe('SignUpController Tests', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  test('Ensure return 400 if password is shorter then 6 length', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: '123',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('password must be longer then 5 characters'))
  })
  test('Ensure to return 400 if password and passwordConfirmation are different', async () => {
    const { sut } = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('Password and passwordConfimation are different'))
  })
  test('Ensure to return 400 if an invalid email is provided', async () => {
    const { sut, emailValidationStub } = makeSut()
    jest.spyOn(emailValidationStub, 'validation').mockReturnValueOnce(false)
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('Invalid email are provided'))
  })
})
