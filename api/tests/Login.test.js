const { expect } = require('chai');
const { HTTPStatusCode } = require('../APIs/HTTPStatusCode');
const LoginAPI = require('../APIs/LoginAPI');
const faker = require('faker')
require('dotenv').config();

describe('LOGIN API Tests', () => {
  let api
  before(async () => {
    api = new LoginAPI();
})
  

  it('should successfully login with existing consumer', async () => {
    requestBody = {
      email: process.env.USEREMAIL,
      password: process.env.PASSWORD
    }
      const response = await api.login(requestBody)
    expect(response.status).to.equal(HTTPStatusCode.OK)
    expect(response.body.authentication.token).to.be.a('string')
    expect(response.body.authentication.bid).to.be.a('number')
    expect(response.body.authentication.umail).to.equal(requestBody.email)  
  })
  const validationData = [
    { testCase: 'user enters invalid email format', email: faker.name.findName(), password: faker.internet.password(faker.datatype.number({ min: 5, max: 40 })) },
    { testCase: 'user enters non-registered email', email: faker.internet.email(), password: faker.internet.password(faker.datatype.number({ min: 5, max: 40 })) },
    { testCase: 'user enters doesnt enter password', email: process.env.USEREMAIL, password: '' }
  ]
  validationData.forEach(async (data) => {
    it(`login error validations |  ${data.testCase}`, async () => {
      requestBody = {
        email: data.email,
        password: data.password
      }
      const response = await api.login(requestBody)
      expect(response.status).to.equal(HTTPStatusCode.UNAUTHORIZED)
    })
  })
})
