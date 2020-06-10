import { IEmailValidation } from '../presentation/protocols/email-validation'
import * as emailValidator from 'email-validator'

export class EmailValidation implements IEmailValidation {
  validation (email: string): boolean {
    return emailValidator.validate(email)
  }
}
