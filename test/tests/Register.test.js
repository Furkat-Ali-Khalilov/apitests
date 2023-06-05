const MainPage = require('../pageobjects/MainPage')
const LoginPage = require('../pageobjects/LoginPage')
const RegisterPage = require('../pageobjects/RegisterPage')
const chai = require('chai')
const { expect } = chai
require('dotenv').config()

const Errors = {
    DUPLICATEEMAIL: 'Email must be unique',
    INVALIDEMAILFORMAT: 'Email address is not valid.',
    INCORRECTPASSWORDLENGTH: 'Password must be 5-40 characters long. ',
    NOPASSWORD: 'Please provide a password. ',
    PASSWORDSDONOTMATCH: ' Passwords do not match '
  }

describe('Register Functionallity', () => {
    let input
    let faker 
    before( async () => {
        faker = require('faker')
        const password = faker.internet.password(faker.datatype.number({ min: 5, max: 40 }))
        input = {
            email: faker.internet.email(),
            password: password,
            repeatPassword: password,
            index: faker.datatype.number({ min: 1, max: 4 }),
            answer: faker.lorem.word()
        }

        await MainPage.open(process.env.BASEURL)
    })

    after(async () => {
        await browser.reloadSession()
    })
    
    it('should succesfully register a new user | Happy path', async () => {
        await MainPage.login()
        await RegisterPage.register(input)
        expect(await LoginPage.isLoginTitleDisplayed()).to.be.true

    })

    it('should not allow registration with duplicate emails', async () => {
        await MainPage.login()
        await RegisterPage.register(input)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.DUPLICATEEMAIL)).to.be.true
    })

    
    it('validate email format', async () => {
        input.email = faker.lorem.word()
        await MainPage.login()
        await RegisterPage.register(input)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.INVALIDEMAILFORMAT)).to.be.true

    })

    it('should not let register without password', async () => {
        input.email = faker.internet.email()
        input.password = ''
        await MainPage.login()
        await RegisterPage.register(input)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.NOPASSWORD)).to.be.true
        
    })

    it('should validate passwords match', async () => {
        input.password = faker.internet.password(faker.datatype.number({ min: 5, max: 40 }))
        input.repeatPassword = faker.internet.password(faker.datatype.number({ min: 5, max: 40 }))
        await MainPage.login()
        await RegisterPage.register(input)
        expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.PASSWORDSDONOTMATCH)).to.be.true
    })



    const passwordLength = [{min:1, max:3},{min:41, max:50}]
    passwordLength.forEach((length) => {
        it('validate password length is valid', async () => {
            input.password = faker.internet.password(faker.datatype.number({ min: length.min, max: length.max }))
            await MainPage.login()
            await RegisterPage.register(input)
            expect(await RegisterPage.validateErrorMessageIsDisplayed(Errors.INCORRECTPASSWORDLENGTH)).to.be.true
        })
    })
    
})


