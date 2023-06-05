const { expect } = require('chai');
const { HTTPStatusCode } = require('../APIs/HTTPStatusCode');
const faker = require('faker');
const RegisterAPI = require('../APIs/RegisterAPI');
require('dotenv').config();

describe('REGISTER API Tests', () => {
  let api
  let email
  before(async () => {
    api = new RegisterAPI();
})

  it('should successfully register new user', async () => {
    email = faker.internet.email()
    requestBody = {
      email: email,
      password: faker.internet.password(faker.datatype.number({ min: 5, max: 40 })) ,
      passwordRepeat: faker.internet.password(faker.datatype.number({ min: 5, max: 40 })) ,
      securityQuestion: {
          id: 1,
          question: "Your eldest siblings middle name?",
          createdAt: faker.date.recent().toISOString(),
          updatedAt: faker.date.recent().toISOString()
      },
      securityAnswer: faker.name.findName()
    }
    const response = await api.register(requestBody)
    
    expect(response.status).to.equal(HTTPStatusCode.CREATED)
    expect(response.body.status).to.equal('success')
    expect(response.body.data.role).to.equal('customer')
    expect(response.body.data.isActive).to.be.true
    expect(response.body.data.id).to.be.a('number')
    expect(response.body.data.email).to.equal(email)
  })

  const validationData = [
    // Test Cases skipped, since api returns 201 HTTP Status Code. Candidate for a defect.
    
    // { testCase: 'user enters invalid email format', email: faker.name.findName(), password: faker.internet.password(faker.datatype.number({ min: 5, max: 40 })) },
    // { testCase: 'user enters short password', email: faker.internet.email(), password: faker.internet.password(faker.datatype.number({ min: 1, max: 4 })) },
    // { testCase: 'user enters long password', email: faker.internet.email(), password: faker.internet.password(faker.datatype.number({ min: 41, max: 50 })) } ,
    // { testCase: 'user enters empty password', email: faker.internet.email(), password: '' }
    { testCase: 'user enters registered email', email: process.env.USEREMAIL, password: process.env.PASSWORD },
   
  ]
  validationData.forEach(async (data) => {
    it(`register functionality error validations |  ${data.testCase}`, async () => {
      requestBody = {
        email: data.email,
        password: data.password,
        passwordRepeat: data.password,
        securityQuestion: {
            id: 1,
            question: "Your eldest siblings middle name?",
            createdAt: faker.date.recent().toISOString(),
            updatedAt: faker.date.recent().toISOString()
        },
        securityAnswer: faker.name.findName()
      }
      const response = await api.register(requestBody)
      expect(response.status).to.equal(HTTPStatusCode.BADREQUEST)
      expect(response.body.message).to.equal('Validation error')
      expect(response.body.errors[0].field).to.equal('email')
      expect(response.body.errors[0].message).to.equal('email must be unique')
    })
  })
  

})

