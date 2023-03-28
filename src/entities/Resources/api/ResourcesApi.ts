import { BaseApi } from 'shared/lib/core';

class ResourcesApi extends BaseApi {
  constructor() {
    super('/resources');
  }

  post(formData: FormData) {
    return this.http.post<ResourcesResponse>('', {}, formData);
  }
}

export default new ResourcesApi();
