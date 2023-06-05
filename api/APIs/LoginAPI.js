const request = require('superagent');
const API = require('../BaseApi/API');

class LoginAPI extends API {
  
    constructor() {
        super()
      }
    
      async login({email, password}) {
        const body = {
          email: email,
          password: password
        };
        const endpoint = '/rest/user/login';
        const headers = {};
    
        const response = await this.post(endpoint, body, headers);
        return response;
    }
}

module.exports = LoginAPI;
