import { HttpReponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'
export const badRequest = (error: Error): HttpReponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpReponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
