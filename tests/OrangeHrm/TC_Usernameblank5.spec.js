import { test, expect } from '@playwright/test';

test('Blank username shows a required validation message', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Password').fill('123245');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required').first()).toBeVisible();
});
