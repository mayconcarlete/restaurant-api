import { SignUpController } from './signup'
import { IHttpRequest, MissingParamError } from './signup-protocols'
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
})
