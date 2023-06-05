

const Page = require('./Page')

class FeedbackPage extends Page {
    
    get slider() {
        return $('mat-slider[id="rating"]')
    }

    get commentInput() {
        return $('#comment')
    }

    get captcha() {
        return $('#captcha')
    }

    get resultInput() {
        return $('#captchaControl')
    }

    get submitButton() {
        return $('button#submitButton')
    }

    getPopUpMessage(message) {
        return $(`//span[text() = '${message}'] `)
    }

    async setFeedbackRate(feedbackText) {
        
        await this.slider.waitForDisplayed()
        await this.slider.click()
        await this.commentInput.waitForDisplayed()
        await this.commentInput.setValue(feedbackText)
        const result = await this.getCaptchaTextResult()
        await this.resultInput.setValue(result)
        await this.submitButton.isClickable()
        await this.submitButton.click()

    }

    async validatePopUpMessage(message) {
        await this.getPopUpMessage(message).waitForDisplayed()
        return await this.getPopUpMessage(message).isDisplayed()
    }

    async getCaptchaTextResult() {
        const expressionText = await this.captcha.getText()
        const parts = expressionText.split(/([-+*/])/)
        let result = parseInt(parts[0])
      
        for (let i = 1; i < parts.length; i += 2) {
          const operator = parts[i]
          const operand = parseInt(parts[i + 1])
      
          switch (operator) {
            case '+':
              result += operand
              break
            case '-':
              result -= operand
              break
            case '*':
              result *= operand
              break
            case '/':
              result /= operand
              break
            default:
              throw new Error(`Invalid operator ${operator}`)
          }
        }
      
        return result.toString()
      }
      
      
      
      
      
      
      

    
    

    
 }

module.exports = new FeedbackPage()
