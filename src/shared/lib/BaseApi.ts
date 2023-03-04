import HTTPTransport from '../core/HTTPTransport';

export const API_BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const API_BASE_URL_RES = 'https://ya-praktikum.tech/api/v2/resources';
export default abstract class BaseApi {
  http: HTTPTransport;
  constructor(endpoint: string) {
    this.http = new HTTPTransport(API_BASE_URL).withEndpoint(endpoint);
  }
}
