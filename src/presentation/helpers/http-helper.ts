import { HttpReponse } from '../protocols/http'
export const badRequest = (error: Error): HttpReponse => {
  return {
    statusCode: 400,
    body: error
  }
}
