import { API_BASE_URL } from 'shared/config';
import { HTTPTransport } from 'shared/lib/core';

export abstract class BaseApi {
  http: HTTPTransport;

  constructor(endpoint: string) {
    this.http = new HTTPTransport(API_BASE_URL).withEndpoint(endpoint);
  }
}
