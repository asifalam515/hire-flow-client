import { test, expect } from '@playwright/test';

test.describe('Employer Sign Up Wizard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the register endpoint
    await page.route('**/auth/employer/register', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: { id: '1', firstName: 'John', lastName: 'Doe', role: 'EMPLOYER' },
          accessToken: 'fake-token',
          verification: { otpCode: '1234', expiresIn: 600 }
        })
      });
    });

    // Mock the OTP verification endpoint
    await page.route('**/auth/verify-otp', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          verified: true,
          user: { id: '1', firstName: 'John', lastName: 'Doe', role: 'EMPLOYER' }
        })
      });
    });

    await page.goto('/employer/sign-up');
  });

  test('should successfully register a new employer', async ({ page }) => {
    // Step 1: Personal Details
    await expect(page.locator('h1')).toContainText('Give us your company information');

    await page.getByPlaceholder('e.g. Robert').fill('John');
    await page.getByPlaceholder('e.g. Fox').fill('Doe');
    await page.getByPlaceholder('name@company.com').fill('john@example.com');
    await page.getByPlaceholder('Create a strong password (min. 8 characters)').fill('password123');
    await page.getByPlaceholder('Re-enter your password to confirm').fill('password123');
    
    await page.getByRole('button', { name: 'Sign up', exact: true }).click();

    // Step 2: Company Setup
    await expect(page.getByText('Please provide your company details to complete your profile')).toBeVisible();

    await page.getByPlaceholder('e.g. Apple Inc. or Hire Flow Technologies').fill('Test Company Inc.');
    await page.getByPlaceholder('e.g. Information Technology, FinTech, Healthcare').fill('Technology');
    await page.getByPlaceholder("Tell us about your company's mission, culture, and what makes it a great place to work...").fill('We build great software.');
    
    await page.getByRole('button', { name: 'Finish Up' }).click();

    // Step 3: OTP Verification
    await expect(page.locator('h1')).toContainText('Verify your email address');
    
    // Use the auto-fill dev code button
    await page.getByRole('button', { name: 'Auto-fill Code' }).click();
    await page.getByRole('button', { name: 'Verify' }).click();

    // Step 4: Success Completion State
    await expect(page.locator('h2')).toContainText('Welcome to Hire Flow!');
    await expect(page.locator('text=Test Company Inc.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Enter Recruiter Dashboard' })).toBeVisible();
  });
});
