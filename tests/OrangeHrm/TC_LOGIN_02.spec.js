import { test, expect } from '@playwright/test';

test('OrangeHRM login page opens successfully', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await expect(page).toHaveURL(/\/auth\/login/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});
