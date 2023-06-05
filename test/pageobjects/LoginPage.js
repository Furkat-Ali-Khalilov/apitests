

const Page = require('./Page')

class LoginPage extends Page {
    
    get loginTitle() {
        return $('//h1[text() = "Login"]')
    }

    get registerButton() {
        return $('//a[text() = "Not yet a customer?"]');
    }

    get emailInput() {
        return $('#email')
    }

    get passwordInput() {
        return $('#password')
    }

    get loginButton() {
        return $('//*[@type = "submit"]')
    }
    
    async isLoginTitleDisplayed () {
        await this.loginTitle.waitForDisplayed()
        return await this.loginTitle.isDisplayed()
    }

    async login(email, password) {
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(password)
        await this.loginButton.isClickable()
        await this.loginButton.click()
    }
    
 }

module.exports = new LoginPage()
