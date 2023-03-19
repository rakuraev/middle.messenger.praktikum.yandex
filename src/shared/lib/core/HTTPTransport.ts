enum HttpMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}
type Options = {
  method: HttpMethods;
  data?: unknown;
  formData?: FormData;
};
export class HTTPTransport {
  private _apiUrl = '';

  private _endpoint = '';

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  withEndpoint(endpoint: string): HTTPTransport {
    this._endpoint = `${this._apiUrl}${endpoint}`;
    return this;
  }

  public get<R>(path = '/'): Promise<R> {
    const options: Options = {
      method: HttpMethods.Get,
    };
    return this._request(path, options);
  }

  public post<R>(path = '/', data?: unknown, formData?: FormData): Promise<R> {
    const options: Options = {
      method: HttpMethods.Post,
      data,
      formData,
    };
    return this._request(path, options);
  }

  public put<R>(path = '/', data?: unknown, formData?: FormData): Promise<R> {
    const options: Options = {
      method: HttpMethods.Put,
      data,
      formData,
    };
    return this._request(path, options);
  }

  public patch<R>(path = '/', data?: unknown): Promise<R> {
    const options: Options = {
      method: HttpMethods.Patch,
      data,
    };
    return this._request(path, options);
  }

  public delete<R>(path = '/', data?: unknown): Promise<R> {
    const options: Options = {
      method: HttpMethods.Delete,
      data,
    };
    return this._request(path, options);
  }

  private _request<R>(
    path: string,
    options: Options = { method: HttpMethods.Get }
  ): Promise<R> {
    const { method, data, formData } = options;
    const url = `${this._endpoint}${path}`;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!formData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === HttpMethods.Get || (!data && !formData)) {
        xhr.send();
      } else if (formData) {
        xhr.send(formData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}