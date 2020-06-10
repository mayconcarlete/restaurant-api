import { IHttpRequest, IHttpResponse, badRequest, serverError } from './signup-protocols'
import { InvalidParamError } from '../../../errors/invalid-param-error'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest[field]) {
          return badRequest(new InvalidParamError(field))
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
