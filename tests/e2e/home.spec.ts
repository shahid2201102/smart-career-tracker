import { test, expect } from '@playwright/test';

test('landing page loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Smart Career Tracker/);
  await expect(page.getByRole('heading', { name: /Track job applications/i })).toBeVisible();
});
