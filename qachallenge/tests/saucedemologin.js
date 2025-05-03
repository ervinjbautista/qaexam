const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function saucedemologin() {
    let driver;

    try {
        // Initialize the Edge WebDriver
        driver = await new Builder().forBrowser('MicrosoftEdge').build();

        // Navigate to the Saucedemo website
        await driver.get('https://www.saucedemo.com/');

        // Find the username and password input fields and enter credentials
        await driver.findElement(By.id('user-name')).sendKeys('lourdes100@test.com');
        await driver.findElement(By.id('password')).sendKeys('Test123!', Key.RETURN);

        // Wait for the inventory page to load (you might need to adjust the timeout)
        await driver.wait(until.urlContains('inventory.html'), 5000);

        // Assertion if the user is able to log-in or not (checking the header label)
        const headerlabel = await driver.findElement(By.className('app_logo')).getText();
        assert.strictEqual(headerlabel, 'Swag Labs');

        // Message in terminal if assertion triggers
        console.log('Login successful!');

        // Error handling and display message
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Close the browser
        if (driver) {
            await driver.quit();
        }
    }
}

saucedemologin();