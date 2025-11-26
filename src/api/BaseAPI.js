// helpers/api/BaseAPI.js
export class BaseAPI {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}) {
    return this.request.get(`${this.baseURL}${endpoint}`, options);
  }

  async post(endpoint, data = {}, options = {}) {
    return this.request.post(`${this.baseURL}${endpoint}`, {
      data,
      ...options
    });
  }

  async put(endpoint, data = {}, options = {}) {
    return this.request.put(`${this.baseURL}${endpoint}`, {
      data,
      ...options
    });
  }

  async delete(endpoint, options = {}) {
    return this.request.delete(`${this.baseURL}${endpoint}`, options);
  }
}
