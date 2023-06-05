const request = require('superagent');
const API = require('../BaseApi/API');

class RegisterAPI extends API {
  
    constructor() {
        super()
  }
  
    async register(body) {
        const endpoint = '/api/Users/'
        const headers = {}
    
        const response = await this.post(endpoint, body, headers)
        return response
      }
}

module.exports = RegisterAPI;
