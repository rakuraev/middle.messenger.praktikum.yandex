import { BaseApi } from 'shared/lib/core';

class ResourcesApi extends BaseApi {
  constructor() {
    super('/resources');
  }

  post(formData: FormData): Promise<ResourcesResponse> {
    return this.http.post('', {}, formData);
  }
}

export default new ResourcesApi();
