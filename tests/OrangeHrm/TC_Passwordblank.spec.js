
const { test, expect } = require('@playwright/test');

test('Password Blank Validation', async ({ page }) => {

    // Open OrangeHRM Login Page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Enter Username
    await page.locator('input[name="username"]').fill('Admin');

    // Keep Password Blank
    await page.locator('input[name="password"]').fill('');

    // Click Login
    await page.locator('button[type="submit"]').click();

    // Get error message
    const actual = page.locator('.oxd-alert-content-text');

    // Verify error message
    await expect(actual).toHaveText('Required');

    console.log('Test Pass');
})
