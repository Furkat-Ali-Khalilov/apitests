

const LoginPage = require('./LoginPage')
const Page = require('./Page');

class RegisterPage extends Page {
    
    get emailInput () {
        return $('#emailControl')
    }

    get passwordInput () {
        return $('#passwordControl')
    }

    get repeatPasswordInput () {
        return $('#repeatPasswordControl')
    }

    get securityQuestionDropdown () {
        return $('//*[@name = "securityQuestion"]')
    }

    get answerInput () {
        return $('#securityAnswerControl')
    }


    get securityQuestionDropdownOptions () {
        return $$('//mat-option[@role = "option"]')
    }

    get submitButton() {
        return $('//button[@type = "submit"]')
    }

    getErrorTextMessage(error) {
        return $(`//*[text() ="${error}"]`)
    }
    
    getSecurityQuestionDropdownOptionsByIndex(index) {
       return this.securityQuestionDropdownOptions[index]
   } 
    
    async register(input) {
        await LoginPage.registerButton.click()
        await this.emailInput.setValue(input.email)
        await this.passwordInput.setValue(input.password)
        await this.repeatPasswordInput.setValue(input.repeatPassword)
        await this.securityQuestionDropdown.click()
        const dropdownOption = await this.getSecurityQuestionDropdownOptionsByIndex(input.index)      
        await dropdownOption.waitForDisplayed()
        await dropdownOption.click()
        await this.answerInput.setValue(input.answer)
        await this.submitButton.click()
    }

    async validateErrorMessageIsDisplayed(error) {
        await this.getErrorTextMessage(error).waitForDisplayed()
        return await this.getErrorTextMessage(error).isDisplayed()
    }
    
 }

module.exports = new RegisterPage()
