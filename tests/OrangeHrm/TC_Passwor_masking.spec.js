const { test, expect } = require('@playwright/test');

test('Verify Password Masking', async ({ page }) => {

    // Open OrangeHRM Login Page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


     await page.locator('input[name="username"]').fill('Admin');

    // Enter Password
    const passwordField = page.locator('input[name="password"]');
    await passwordField.fill('admin123');

    // Verify password is masked
    await expect(passwordField).toHaveAttribute('type', 'password');

    // Click Login
    await page.locator('button[type="submit"]').click();

    // Verify successful login
    await expect(page).toHaveURL(/dashboard/);

});