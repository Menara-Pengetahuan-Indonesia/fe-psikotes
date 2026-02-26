import { test, expect } from '@playwright/test'

test.describe('Exam Taking - Complete Workflow', () => {
  test('should access published exam', async ({ page }) => {
    // Navigate to exam form
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Verify exam interface loads
    await expect(page.getByText('RIASEC')).toBeVisible()
    await expect(page.getByRole('button', { name: /start/i })).toBeVisible()
  })

  test('should start exam and display questions', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Verify exam interface
    await expect(page.getByText(/question/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /yes|no/i })).toBeVisible()
  })

  test('should answer true/false questions', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Answer first question
    await page.getByRole('button', { name: /yes/i }).click()

    // Verify answer recorded
    await expect(page.getByRole('button', { name: /yes/i })).toHaveClass(/selected|active/)
  })

  test('should navigate between questions', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Answer first question
    await page.getByRole('button', { name: /yes/i }).click()

    // Go to next question
    await page.getByRole('button', { name: /next/i }).click()

    // Verify on next question
    const questionNumber = await page.locator('[data-testid="question-number"]').textContent()
    expect(parseInt(questionNumber || '0')).toBeGreaterThan(1)
  })

  test('should show timer', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Verify timer visible
    await expect(page.locator('[data-testid="timer"]')).toBeVisible()
  })

  test('should show progress bar', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Verify progress bar visible
    await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible()
  })

  test('should submit exam and show results', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start exam
    await page.getByRole('button', { name: /start/i }).click()

    // Answer all questions
    const yesButtons = page.locator('button:has-text("Yes")')
    const count = await yesButtons.count()

    for (let i = 0; i < count; i++) {
      await page.getByRole('button', { name: /yes/i }).first().click()
      const nextButton = page.getByRole('button', { name: /next/i })
      if (await nextButton.isVisible()) {
        await nextButton.click()
      }
    }

    // Submit exam
    await page.getByRole('button', { name: /submit|finish/i }).click()

    // Verify results page
    await expect(page.getByText(/result|score/i)).toBeVisible()
  })

  test('should display scoring breakdown', async ({ page }) => {
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')

    // Start and complete exam
    await page.getByRole('button', { name: /start/i }).click()

    // Answer all questions quickly
    const yesButtons = page.locator('button:has-text("Yes")')
    const count = await yesButtons.count()

    for (let i = 0; i < count; i++) {
      await page.getByRole('button', { name: /yes/i }).first().click()
      const nextButton = page.getByRole('button', { name: /next/i })
      if (await nextButton.isVisible()) {
        await nextButton.click()
      }
    }

    // Submit
    await page.getByRole('button', { name: /submit|finish/i }).click()

    // Verify scoring breakdown
    await expect(page.locator('[data-testid="score-breakdown"]')).toBeVisible()
  })
})
