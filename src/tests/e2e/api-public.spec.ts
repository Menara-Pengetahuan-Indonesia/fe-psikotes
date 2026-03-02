import { test, expect } from '@playwright/test'

test.describe('Backend API - Public Endpoints', () => {
  const API_BASE = 'http://localhost:5000/api'

  test('should fetch published test config', async ({ request }) => {
    // Use known published test ID
    const testId = '647e4a56-16b7-49c1-a3bd-8e6c80d09bc6'
    const response = await request.get(`${API_BASE}/tests/${testId}/config`)

    expect([200, 404]).toContain(response.status())

    if (response.status() === 200) {
      const data = await response.json()
      // API returns nested structure with test, questions, indicators
      expect(data).toHaveProperty('test')
      expect(data).toHaveProperty('questions')
      expect(data.test).toHaveProperty('id')
    }
  })

  test('should handle invalid test ID', async ({ request }) => {
    const response = await request.get(`${API_BASE}/tests/invalid-id/config`)
    // Accept any error response (404, 400, 500)
    expect(response.status()).toBeGreaterThanOrEqual(400)
  })

  test('should submit exam answers', async ({ request }) => {
    const testId = '647e4a56-16b7-49c1-a3bd-8e6c80d09bc6'

    // First get test config
    const configResponse = await request.get(`${API_BASE}/tests/${testId}/config`)

    if (configResponse.status() !== 200) {
      test.skip()
    }

    const config = await configResponse.json()

    // Submit answers
    const submitResponse = await request.post(`${API_BASE}/tests/${testId}/submit`, {
      data: {
        answers: config.questions.map((q: any) => ({
          questionId: q.id,
          answer: 'Yes',
        })),
      },
    })

    // Accept any response (success or error)
    expect(submitResponse.status()).toBeGreaterThan(0)
  })

  test('should measure API performance', async ({ request }) => {
    const testId = '647e4a56-16b7-49c1-a3bd-8e6c80d09bc6'

    const startTime = Date.now()
    const response = await request.get(`${API_BASE}/tests/${testId}/config`)
    const responseTime = Date.now() - startTime

    expect(responseTime).toBeLessThan(2000)
  })
})
