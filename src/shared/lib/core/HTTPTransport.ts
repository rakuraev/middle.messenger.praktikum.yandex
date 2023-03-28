import queryStringify from 'shared/lib/queryStringify';

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

  public get<R = void>(path = '/', query?: PlainObject) {
    const options: Options = {
      method: HttpMethods.Get,
    };
    const pathWithQuery = query ? path + queryStringify(query) : path;
    return this._request<R>(pathWithQuery, options);
  }

  public post<R = void>(path = '/', data?: unknown, formData?: FormData) {
    const options: Options = {
      method: HttpMethods.Post,
      data,
      formData,
    };
    return this._request<R>(path, options);
  }

  public put<R = void>(path = '/', data?: unknown, formData?: FormData) {
    const options: Options = {
      method: HttpMethods.Put,
      data,
      formData,
    };
    return this._request<R>(path, options);
  }

  public patch<R = void>(path = '/', data?: unknown) {
    const options: Options = {
      method: HttpMethods.Patch,
      data,
    };
    return this._request<R>(path, options);
  }

  public delete<R = void>(path = '/', data?: unknown) {
    const options: Options = {
      method: HttpMethods.Delete,
      data,
    };
    return this._request<R>(path, options);
  }

  // Не совсем понятно как генерик прокинуть аргумент
  // private _get<R>: HTTPMethod<R> = (path, options) =>
  //   this._request(path, { ...options, method: HttpMethods.Get });

  private _request<R>(path: string, options: Options): Promise<R> {
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
