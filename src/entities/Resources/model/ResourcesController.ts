import { ResourcesApi } from '../api';

class ResourcesController {
  api = ResourcesApi;

  async uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('resource', file);
      const res = await this.api.post(formData);
      return res;
    } catch (e) {
      console.error('Error on uploading file');
      if ((e as XMLHttpRequest)?.response?.reason) {
        throw (e as XMLHttpRequest).response.reason;
      }
    }
  }
}

export default new ResourcesController();
