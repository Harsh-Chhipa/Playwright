import { test, expect } from '@playwright/test';

test('OrangeHRM Login Test', async ({ page }) => {

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Username
    await page.getByPlaceholder('Username').fill('Admin');

    // Password
    await page.getByPlaceholder('Password').fill('admin123');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify Dashboard
    await expect(page).toHaveURL(/dashboard/);

   
}); 