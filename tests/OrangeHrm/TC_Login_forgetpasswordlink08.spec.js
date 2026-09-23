import { test } from '@playwright/test';

test('Forgot Password Link Test', async ({ page }) => {

    // Open Google
    await page.goto('https://www.google.com/');

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Click on Forgot your password?
    await page.getByText('Forgot your password?').click();

});