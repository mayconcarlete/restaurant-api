import { HttpReponse, HttpRequest } from './http'
export interface Controller{
  handle (httpRequest: HttpRequest): Promise<HttpReponse>
}
