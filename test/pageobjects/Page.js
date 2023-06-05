
module.exports = class Page {
   
    async open(url) {
        try {
            await browser.maximizeWindow()
            await browser.url(url)
            await browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'), 10000)
        } catch (error) {
            console.error(`Failed to load page: ${error}`)
        }
    }
}

