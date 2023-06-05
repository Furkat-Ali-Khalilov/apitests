

const Page = require('./Page')

class MainPage extends Page {
    
    get dismissButton () {
        return $('//span[text() = "Dismiss"]');
    }

    get accountButton () {
        return $('#navbarAccount');
    }

    get loginButton () {
        return $('#navbarLoginButton')
    }

    get logoutButton () {
        return $('#navbarLogoutButton')
    }

    get menuButton() {
        return $('//mat-icon[text() = "menu"]')
    }

    get customerFeedbackButton() {
        return $('//span[text() =" Customer Feedback "]')
    }

    async open(url) {
        await super.open(url)
        await this.dismissButton.click()
    }

    getUserEmail(email) {
      return $(`//button/span[text() = ' ${email} ']`)  
    }

    async login () {
        await this.accountButton.waitForDisplayed()
        await this.accountButton.click()
        await this.loginButton.waitForDisplayed()
        await this.loginButton.click()
    }

    async validateUserLoggedIn(email) {
        await this.accountButton.click()
        await this.getUserEmail(email).waitForDisplayed()
        return await this.getUserEmail(email).isDisplayed()
    }

    async logout () {
        await this.logoutButton.waitForDisplayed()
        await this.logoutButton.click()
    }

    async navigateToFeedbackPage() {
        await this.menuButton.click()
        await this.customerFeedbackButton.waitForDisplayed()
        await this.customerFeedbackButton.click()
    }
   
}

module.exports = new MainPage()
