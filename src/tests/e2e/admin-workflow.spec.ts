import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard - Complete Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin')
  })

  test('should load admin dashboard', async ({ page }) => {
    await expect(page.getByText('Tests')).toBeVisible()
    await expect(page.getByRole('button', { name: /create test/i })).toBeVisible()
  })

  test('should create a new test', async ({ page }) => {
    // Click create test button
    await page.getByRole('button', { name: /create test/i }).click()

    // Fill form
    await page.getByLabel(/test name/i).fill('E2E Test - Complete Workflow')
    await page.getByLabel(/description/i).fill('Comprehensive E2E testing')
    await page.getByLabel(/duration/i).fill('30')

    // Submit
    await page.getByRole('button', { name: /create/i }).click()

    // Should redirect to test detail page
    await expect(page).toHaveURL(/\/admin\/tests\//)
    await expect(page.getByText('E2E Test - Complete Workflow')).toBeVisible()
  })

  test('should add indicators to test', async ({ page }) => {
    // Navigate to existing test
    const testLink = page.locator('a:has-text("Test Kepribadian")').first()
    await testLink.click()

    // Go to indicators tab
    await page.getByRole('tab', { name: /indicator/i }).click()

    // Add indicator
    await page.getByRole('button', { name: /add indicator/i }).click()
    await page.getByLabel(/indicator name/i).fill('E2E Indicator')
    await page.getByLabel(/description/i).fill('Test indicator for E2E')
    await page.getByRole('button', { name: /add/i }).click()

    // Verify indicator added
    await expect(page.getByText('E2E Indicator')).toBeVisible()
  })

  test('should add sections to test', async ({ page }) => {
    // Navigate to existing test
    const testLink = page.locator('a:has-text("Test Kepribadian")').first()
    await testLink.click()

    // Go to sections tab
    await page.getByRole('tab', { name: /section/i }).click()

    // Add section
    await page.getByRole('button', { name: /add section/i }).click()
    await page.getByLabel(/section name/i).fill('E2E Section')
    await page.getByLabel(/description/i).fill('Test section for E2E')
    await page.getByRole('button', { name: /add/i }).click()

    // Verify section added
    await expect(page.getByText('E2E Section')).toBeVisible()
  })

  test('should add questions to test', async ({ page }) => {
    // Navigate to existing test
    const testLink = page.locator('a:has-text("Test Kepribadian")').first()
    await testLink.click()

    // Go to questions tab
    await page.getByRole('tab', { name: /question/i }).click()

    // Add question
    await page.getByRole('button', { name: /add question/i }).click()
    await page.getByLabel(/question text/i).fill('E2E Test Question?')
    await page.getByLabel(/type/i).selectOption('TRUE_FALSE')
    await page.getByRole('button', { name: /add/i }).click()

    // Verify question added
    await expect(page.getByText('E2E Test Question?')).toBeVisible()
  })

  test('should publish test', async ({ page }) => {
    // Navigate to existing test
    const testLink = page.locator('a:has-text("Test Kepribadian")').first()
    await testLink.click()

    // Go to publish tab
    await page.getByRole('tab', { name: /publish/i }).click()

    // Click publish button
    await page.getByRole('button', { name: /publish/i }).click()

    // Confirm
    await page.getByRole('button', { name: /confirm/i }).click()

    // Verify published
    await expect(page.getByText(/published/i)).toBeVisible()
  })

  test('should edit test details', async ({ page }) => {
    // Navigate to existing test
    const testLink = page.locator('a:has-text("Test Kepribadian")').first()
    await testLink.click()

    // Go to overview tab
    await page.getByRole('tab', { name: /overview/i }).click()

    // Edit test
    await page.getByRole('button', { name: /edit/i }).click()
    await page.getByLabel(/test name/i).fill('Updated Test Name')
    await page.getByRole('button', { name: /save/i }).click()

    // Verify updated
    await expect(page.getByText('Updated Test Name')).toBeVisible()
  })

  test('should delete test with confirmation', async ({ page }) => {
    // Get initial test count
    const testRows = page.locator('table tbody tr')
    const initialCount = await testRows.count()

    // Find and delete a test
    const deleteButton = page.locator('button:has-text("Delete")').first()
    await deleteButton.click()

    // Confirm deletion
    await page.getByRole('button', { name: /confirm/i }).click()

    // Verify test removed
    const finalCount = await testRows.count()
    expect(finalCount).toBeLessThan(initialCount)
  })
})
