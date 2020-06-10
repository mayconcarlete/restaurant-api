import { IHttpRequest, IHttpResponse, badRequest, serverError, MissingParamError } from './signup-protocols'

export class SignUpController {
  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
    } catch (error) {
      return serverError()
    }
  }
}
