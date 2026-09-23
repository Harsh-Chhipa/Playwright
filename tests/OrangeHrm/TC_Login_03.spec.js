import { test, expect } from '@playwright/test';

test('Valid username and password login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin1234');
  await page.getByRole('button', { name: 'Login' }).click();
   // Wait for page to render
    await page.waitForTimeout(2000);
 

  //Take screenshot
    await page.screenshot({
        path: 'screenshots/invalid-login.png',
        fullPage: true
    });
 
});
