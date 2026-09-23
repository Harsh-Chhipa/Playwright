import { test, expect } from '@playwright/test';

test('Logout after valid login', async ({ page }) => {
	await page.goto('https://www.google.com/');
	await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

	await page.getByPlaceholder('Username').fill('Admin');
	await page.getByPlaceholder('Password').fill('admin123');
	await page.getByRole('button', { name: 'Login' }).click();

	await page.locator('header li span p').click();
	await page.getByText('Logout', { exact: true }).click();

	await expect(page).toHaveURL(/auth\/login/);
});
