import { SignUpController } from './signup'
import { IHttpRequest, MissingParamError } from './signup-protocols'
import { InvalidParamError } from '../../../errors'
const makeSut = (): SignUpController => {
  const signUpController = new SignUpController()
  return signUpController
}

describe('SignUpController Tests', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email is provided', () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('email'))
  })
  test('Should return 400 if no password is provided', () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('password'))
  })
  test('Should return 400 if no passwordConfirmation is provided', () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
  test('Ensure return 400 if password is shorter then 6 length', () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: '123',
        passwordConfirmation: 'any_password'
      }
    }
    const response = sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('password must be longer then 5 characters'))
  })
})
