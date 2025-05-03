const { Builder, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const assert = require('assert');

async function runNewspapersLoginTest() {
    let driver;

    try {
        // Initialize the Edge WebDriver
        driver = await new Builder().forBrowser('MicrosoftEdge').build();

        // Navigate to the Newspapers.com homepage
        await driver.get('https://www.newspapers.com/');

        // Click on the "Sign in" link
        const signinLink = await driver.findElement(By.className('MemberNavigation_HeaderButtonLink__L6X_g')); 
        await signinLink.click();

        // Wait for the login modal or page to load (adjust timeout if necessary)
        await driver.wait(until.elementLocated(By.id('email')), 5000);
        await driver.wait(until.elementLocated(By.id('password')), 5000);

        // Find the username and password input fields and enter credentials
        await driver.findElement(By.id('email')).sendKeys('lourdes100@test.com');
        await driver.findElement(By.id('password')).sendKeys('Test123!', Key.RETURN);

        // Wait for successful login
        await driver.wait(until.elementLocated(By.className('user-account-menu')), 10000);

        // Getting an error "There was a problem verifying you are not a robot. Please try again or refresh the page.""
        // Will insert assertion here if captcha is bypassed
        // console.log('Login successful!');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Close the browser
        if (driver) {
            await driver.quit();
        }
    }
}

runNewspapersLoginTest();