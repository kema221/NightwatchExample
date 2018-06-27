module.exports = {
    'Nightwatch Demo Test': browser => {
        browser
            .url('https://www.google.com/')
            .waitForElementVisible('body')
            .end()
    }
}