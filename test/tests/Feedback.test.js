const MainPage = require('../pageobjects/MainPage')
const LoginPage = require('../pageobjects/LoginPage')
const RegisterPage = require('../pageobjects/RegisterPage')
const FeedbackPage = require('../pageobjects/FeedbackPage')

const chai = require('chai')
const { expect } = chai
require('dotenv').config()

const popUpMessages = {
    ErrorMessage: 'Wrong answer to CAPTCHA. Please try again.',
    ThankYouMessage: 'Thank you for your feedback.'
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
        await LoginPage.login(input.email, input.password)
    })

    after(async () => {
        await browser.reloadSession()
      })
    
    it('should successfuly leave customer feedback with rating 3 ', async () => {
        await MainPage.navigateToFeedbackPage()
        await FeedbackPage.setFeedbackRate(faker.lorem.sentences())
        expect(await FeedbackPage.validatePopUpMessage(popUpMessages.ThankYouMessage)).to.be.true
    })
  
})


