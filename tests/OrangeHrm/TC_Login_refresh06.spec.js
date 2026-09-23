import { test } from '@playwright/test';

test('Page Refresh Test', async ({ page }) => {

    // Open Google
    await page.goto('https://www.google.com/');

    // Open OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Refresh the page
    await page.reload();

});