const { test, expect } = require('@playwright/test');

test('should display initial count', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  // Just verify that a count is displayed (could be any number depending on previous usage)
  const countElement = page.locator('[data-testid="count-value"]');
  await expect(countElement).toBeVisible();
  const countText = await countElement.textContent();
  expect(!isNaN(parseInt(countText))).toBeTruthy(); // Verify it's a number
});

test('should increment count when button is clicked', async ({ page }) => {
  await page.goto('http://localhost:3001/');

  // Record initial count
  const initialCountElement = page.locator('[data-testid="count-value"]');
  await expect(initialCountElement).toBeVisible();
  const initialCountText = await initialCountElement.textContent();
  const initialCount = parseInt(initialCountText || '0');

  // Click the button to send message into the void
  const button = page.locator('button:has-text("Send message into the void")');
  await button.click();

  // Wait for the count to update
  await page.waitForTimeout(2000); // Allow time for API call to complete

  // Check that the count has incremented
  const updatedCountText = await initialCountElement.textContent();
  const updatedCount = parseInt(updatedCountText || '0');

  expect(updatedCount).toBeGreaterThan(initialCount);
});