const request = require('superagent');

class API {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  async get(endpoint, headers = {}) {
    try {
      const response = await request
        .get(`${this.baseUrl}/${endpoint}`)
        .set(headers);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async post(endpoint, body = {}, headers = {}) {
    try {
      const response = await request
        .post(`${this.baseUrl}/${endpoint}`)
        .send(body)
        .set(headers);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async patch(endpoint, body = {}, headers = {}) {
    try {
      const response = await request
        .patch(`${this.baseUrl}/${endpoint}`)
        .send(body)
        .set(headers);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async delete(endpoint, headers = {}) {
    try {
      const response = await request
        .delete(`${this.baseUrl}/${endpoint}`)
        .set(headers);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

module.exports = API;
