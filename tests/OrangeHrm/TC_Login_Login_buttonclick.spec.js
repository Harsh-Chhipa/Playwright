import { test } from '@playwright/test';

test('Login Button Click Test', async ({ page }) => {

    // Open Google
    await page.goto('https://www.google.com/');

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Enter Username
    await page.getByPlaceholder('Username').fill('Admin');

    // Enter Password
    await page.getByPlaceholder('Password').fill('admin123');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

});