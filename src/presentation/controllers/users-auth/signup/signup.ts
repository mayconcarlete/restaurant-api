import {
  IHttpRequest, IHttpResponse, badRequest, serverError,
  MissingParamError, InvalidParamError, IController, IEmailValidation
} from './signup-protocols'

export class SignUpController implements IController {
  private readonly emailValidator

  constructor (emailValidator: IEmailValidation) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { password, passwordConfirmation, email } = httpRequest.body
      if (password.length < 6) {
        return badRequest(new InvalidParamError('password must be longer then 5 characters'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('Password and passwordConfimation are different'))
      }
      if (!this.emailValidator.validation(email)) {
        return badRequest(new InvalidParamError('Invalid email are provided'))
      }
      const test = await (2 + 2)
      console.log(test)
      // TODO VERIFY IF EMAIL EXISTS
      // TODO INSERT EMAIL ON DB
      return {
        statusCode: 200,
        body: test
      }
    } catch (error) {
      return serverError()
    }
  }
}
