import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('shows three pillars', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Psikotes')).toBeVisible()
    await expect(page.getByText('Konseling & Coaching')).toBeVisible()
    await expect(page.getByText('Training & Program')).toBeVisible()
  })

  test('navigates to login', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Login')
    await expect(page).toHaveURL('/login')
  })
})

test.describe('Auth Flow', () => {
  test('shows login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test('shows register form', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByLabel('Nama')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByRole('button', { name: /daftar/i })).toBeVisible()
  })
})
