import { SignUpController } from './signup'
import { IHttpRequest } from '../../../protocols/http'
import { InvalidParamError } from '../../../errors/invalid-param-error'

const makeSut = (): SignUpController => {
  const signUpController = new SignUpController()
  return signUpController
}

describe('SignUpController Tests', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = makeSut()
    const httpRequest: IHttpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new InvalidParamError('name'))
  })
})
