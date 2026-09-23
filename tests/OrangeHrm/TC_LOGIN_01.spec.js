import { test, expect } from '@playwright/test';

test('Valid login opens the OrangeHRM dashboard', async ({ page }) => {
	await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

	await page.getByPlaceholder('Username').fill('Admin');
	await page.getByPlaceholder('Password').fill('admin123');
	await page.getByRole('button', { name: 'Login' }).click();
	
	await expect(page).toHaveURL(/dashboard/);
});
