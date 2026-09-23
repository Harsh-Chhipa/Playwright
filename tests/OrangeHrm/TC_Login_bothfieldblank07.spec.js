import { test, expect } from '@playwright/test';

test('Both Fields Blank Test', async ({ page }) => {

    // Open Google
    await page.goto('https://www.google.com/');

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Keep Username field blank
    await page.getByPlaceholder('Username').fill('');

    // Keep Password field blank
    await page.getByPlaceholder('Password').fill('');

    // Click Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify "Required" message
    const actual = await page.locator('span.oxd-input-field-error-message').first().textContent();
    const expected = 'Required';

    await expect(actual).toBe(expected);

    console.log('Test Pass');
});