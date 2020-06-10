import { IHttpRequest, IHttpResponse, badRequest, serverError, MissingParamError } from './signup-protocols'
import { InvalidParamError } from '../../../errors'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation } = httpRequest.body
      if (password.length < 6) {
        return badRequest(new InvalidParamError('password must be longer then 5 characters'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('Password and passwordConfimation are different'))
      }
      return {
        statusCode: 200,
        body: 'ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}
