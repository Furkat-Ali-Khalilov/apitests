const MainPage = require('../pageobjects/MainPage')
const LoginPage = require('../pageobjects/LoginPage')
const RegisterPage = require('../pageobjects/RegisterPage')
const chai = require('chai')
const { expect } = chai
require('dotenv').config()

const Errors = {
    INVALIDEMAILORPASSWORD: 'Invalid email or password.'
  }

describe('Login Functionallity', () => {
    let input
    let faker
    before( async () => {
        faker = require('faker')
        const password = faker.internet.password(faker.datatype.number({ min: 5, max: 40 }))
        input = {
            email: faker.internet.email(),
            password: password,
            repeatPassword: password,
            index: faker.datatype.number({ min: 1, max: 14 }),
            answer: faker.lorem.word()
        }

        await MainPage.open(process.env.BASEURL)
        await MainPage.login()
        await RegisterPage.register(input)
    })

    after(async () => {
        await browser.reloadSession()
      })
    
    it('should succesfully login existing user | Happy path', async () => {
        await LoginPage.login(input.email, input.password)
        expect(await MainPage.validateUserLoggedIn(input.email)).to.be.true
    })


    it('should display error when user logs in with invalid password', async () => {
        input.password = faker.internet.password(faker.datatype.number({ min: 5, max: 40 }))
        await MainPage.logout()
        await MainPage.login()
        await LoginPage.login(input.email, input.password)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.INVALIDEMAILORPASSWORD)).to.be.true
    })

    it('should display error when user logs in with unregistered email', async () => {
        input.email = faker.internet.email()
        await LoginPage.login(input.email, input.password)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.INVALIDEMAILORPASSWORD)).to.be.true
    })
  
})


