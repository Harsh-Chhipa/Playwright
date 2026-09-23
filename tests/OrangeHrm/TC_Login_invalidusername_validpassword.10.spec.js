import { test, expect } from '@playwright/test';

test('Invalid Username Valid Password Test', async ({ page }) => {

    // Open Google
    await page.goto('https://www.google.com/');

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');


    // Enter invalid username
    await page.getByPlaceholder('Username').fill('harsh');

    // Enter valid password
    await page.getByPlaceholder('Password').fill('admin123');

    // Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    

    // Verify error message
    const actual = await page
        .locator('p.oxd-text.oxd-text--p.oxd-alert-content-text')
        .textContent();

    const expected = 'Invalid credentials';

     //Take screenshot
    await page.screenshot({
        path: 'screenshots/invalid-login.png',
        fullPage: true

    
    
    });

    console.log('Test Pass');
});