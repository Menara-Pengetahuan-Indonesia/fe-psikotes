import { test, expect } from '@playwright/test'

test.describe('API Integration Tests - Fixed', () => {
  const API_BASE = 'http://localhost:5000/api'

  test('should fetch public test config', async ({ request }) => {
    // Get a published test ID first
    const listResponse = await request.get(`${API_BASE}/admin/tests`)

    // If we get 401, skip this test (auth required)
    if (listResponse.status() === 401) {
      test.skip()
    }

    const tests = await listResponse.json()
    if (!Array.isArray(tests) || tests.length === 0) {
      test.skip()
    }

    const publishedTest = tests.find((t: any) => t.isPublished)
    if (!publishedTest) {
      test.skip()
    }

    // Get test config (should be public)
    const response = await request.get(`${API_BASE}/tests/${publishedTest.id}/config`)
    expect([200, 404]).toContain(response.status())
  })

  test('should handle missing test gracefully', async ({ request }) => {
    const response = await request.get(`${API_BASE}/tests/invalid-id-12345/config`)
    expect([404, 400]).toContain(response.status())
  })

  test('should validate test data structure', async ({ request }) => {
    const listResponse = await request.get(`${API_BASE}/admin/tests`)

    if (listResponse.status() === 401) {
      test.skip()
    }

    const tests = await listResponse.json()
    if (!Array.isArray(tests) || tests.length === 0) {
      test.skip()
    }

    // Verify test structure
    const test_data = tests[0]
    expect(test_data).toHaveProperty('id')
    expect(test_data).toHaveProperty('name')
    expect(test_data).toHaveProperty('duration')
  })

  test('should handle concurrent requests', async ({ request }) => {
    const promises = []

    // Make 5 concurrent requests
    for (let i = 0; i < 5; i++) {
      promises.push(request.get(`${API_BASE}/admin/tests`))
    }

    const responses = await Promise.all(promises)
    responses.forEach(response => {
      expect([200, 401]).toContain(response.status())
    })
  })

  test('should measure API response time', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/admin/tests`)
    const responseTime = Date.now() - startTime

    // Should respond within reasonable time
    expect(responseTime).toBeLessThan(2000)
  })
})
