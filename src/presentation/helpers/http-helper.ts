import { IHttpResponse } from '../protocols/http'

export const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: 'Server Error'
  }
}

export const ok = (data): IHttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
