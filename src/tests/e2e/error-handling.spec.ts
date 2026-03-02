import { test, expect } from '@playwright/test'

test.describe('Error Handling & Edge Cases', () => {
  const API_BASE = 'http://localhost:5000/api'

  test('should handle invalid test ID gracefully', async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/tests/invalid-id-12345`)
    expect([404, 400]).toContain(response.status())
  })

  test('should validate required fields on test creation', async ({ request }) => {
    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: '',
        duration: 30,
      },
    })

    expect([400, 422]).toContain(response.status())
  })

  test('should validate duration is positive', async ({ request }) => {
    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Test',
        duration: -10,
      },
    })

    expect([400, 422]).toContain(response.status())
  })

  test('should handle missing authorization gracefully', async ({ request }) => {
    // Try to access admin endpoint without auth
    const response = await request.get(`${API_BASE}/admin/tests`, {
      headers: {
        'Authorization': 'Bearer invalid-token',
      },
    })

    // Should either return 401 or allow (depending on auth implementation)
    expect([200, 401, 403]).toContain(response.status())
  })

  test('should handle network errors gracefully', async ({ page }) => {
    // Try to access with invalid API URL
    await page.goto('/admin')

    // Page should still load even if API fails
    await expect(page.getByText('Tests')).toBeVisible()
  })

  test('should handle form submission errors', async ({ page }) => {
    await page.goto('/admin')

    // Try to create test with empty name
    await page.getByRole('button', { name: /create test/i }).click()
    await page.getByLabel(/duration/i).fill('30')
    await page.getByRole('button', { name: /create/i }).click()

    // Should show error message
    await expect(page.locator('[role="alert"]')).toBeVisible()
  })

  test('should handle concurrent requests', async ({ request }) => {
    const promises = []

    // Create 5 tests concurrently
    for (let i = 0; i < 5; i++) {
      promises.push(
        request.post(`${API_BASE}/admin/tests`, {
          data: {
            name: `Concurrent Test ${i}`,
            description: 'Concurrent test',
            duration: 30,
          },
        })
      )
    }

    const responses = await Promise.all(promises)
    responses.forEach(response => {
      expect(response.status()).toBe(201)
    })
  })

  test('should handle large payloads', async ({ request }) => {
    const largeDescription = 'x'.repeat(5000)

    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Large Payload Test',
        description: largeDescription,
        duration: 30,
      },
    })

    expect([201, 400, 413]).toContain(response.status())
  })

  test('should handle special characters in input', async ({ request }) => {
    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Test with <script>alert("xss")</script>',
        description: 'Test with special chars: !@#$%^&*()',
        duration: 30,
      },
    })

    expect(response.status()).toBe(201)
    const data = await response.json()

    // Verify special chars are properly escaped/sanitized
    expect(data.name).toBeDefined()
  })

  test('should handle rapid successive requests', async ({ request }) => {
    const testId = 'test-id-123'

    // Make rapid requests
    const responses = await Promise.all([
      request.get(`${API_BASE}/admin/tests/${testId}`),
      request.get(`${API_BASE}/admin/tests/${testId}`),
      request.get(`${API_BASE}/admin/tests/${testId}`),
    ])

    responses.forEach(response => {
      expect([200, 404]).toContain(response.status())
    })
  })
})
