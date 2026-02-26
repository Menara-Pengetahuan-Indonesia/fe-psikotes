import { test, expect } from '@playwright/test'

test.describe('Performance Testing', () => {
  const API_BASE = 'http://localhost:5001/api'

  test('should load admin dashboard within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/admin')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(2000) // 2 seconds
    await expect(page.getByText('Tests')).toBeVisible()
  })

  test('should fetch test list within acceptable time', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/admin/tests`)
    const responseTime = Date.now() - startTime

    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(500) // 500ms
  })

  test('should create test within acceptable time', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Performance Test - ' + Date.now(),
        description: 'Performance testing',
        duration: 30,
      },
    })
    const responseTime = Date.now() - startTime

    expect(response.status()).toBe(201)
    expect(responseTime).toBeLessThan(500) // 500ms
  })

  test('should fetch test config within acceptable time', async ({ request }) => {
    // Get test list
    const listResponse = await request.get(`${API_BASE}/admin/tests`)
    const tests = await listResponse.json()
    const testId = tests[0].id

    // Measure config fetch time
    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/tests/${testId}/config`)
    const responseTime = Date.now() - startTime

    expect(response.status()).toBe(200)
    expect(responseTime).toBeLessThan(500) // 500ms
  })

  test('should render exam interface within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/psikotes/mahasiswa/minat-bakat/form?testId=647e4a56-16b7-49c1-a3bd-8e6c80d09bc6')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(3000) // 3 seconds
    await expect(page.getByText(/question|start/i)).toBeVisible()
  })

  test('should handle multiple concurrent API calls', async ({ request }) => {
    const startTime = Date.now()

    const promises = []
    for (let i = 0; i < 10; i++) {
      promises.push(request.get(`${API_BASE}/admin/tests`))
    }

    const responses = await Promise.all(promises)
    const totalTime = Date.now() - startTime

    responses.forEach(response => {
      expect(response.status()).toBe(200)
    })

    // 10 requests should complete in reasonable time
    expect(totalTime).toBeLessThan(5000) // 5 seconds
  })

  test('should measure database query performance', async ({ request }) => {
    const startTime = Date.now()

    // Fetch test with all relations
    const response = await request.get(`${API_BASE}/admin/tests`)
    const tests = await response.json()
    const testId = tests[0].id

    const configResponse = await request.get(`${API_BASE}/tests/${testId}/config`)
    const queryTime = Date.now() - startTime

    expect(configResponse.status()).toBe(200)
    expect(queryTime).toBeLessThan(1000) // 1 second for complex query
  })
})
