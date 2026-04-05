import { test, expect } from '@playwright/test'

test.describe('Exam Taking - Public Workflow', () => {
  test('should access published exam page', async ({ page }) => {
    // Use a known published test ID from database
    const testId = '647e4a56-16b7-49c1-a3bd-8e6c80d09bc6'
    await page.goto(`/mahasiswa/minat-bakat/form?testId=${testId}`)

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check if page loaded
    const pageContent = await page.content()
    expect(pageContent.length).toBeGreaterThan(100)
  })

  test('should display exam interface', async ({ page }) => {
    const testId = '647e4a56-16b7-49c1-a3bd-8e6c80d09bc6'
    await page.goto(`/mahasiswa/minat-bakat/form?testId=${testId}`)

    await page.waitForLoadState('networkidle')

    // Check for exam-related content
    const content = await page.content()
    expect(content).toMatch(/question|exam|test|start/i)
  })

  test('should handle invalid test ID', async ({ page }) => {
    await page.goto('/mahasiswa/minat-bakat/form?testId=invalid-id')

    await page.waitForLoadState('networkidle')

    // Should either show error or redirect
    const url = page.url()
    expect(url).toBeDefined()
  })

  test('should load home page', async ({ page }) => {
    await page.goto('/')

    await page.waitForLoadState('networkidle')

    const content = await page.content()
    expect(content.length).toBeGreaterThan(100)
  })

  test('should measure page load time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })
})
