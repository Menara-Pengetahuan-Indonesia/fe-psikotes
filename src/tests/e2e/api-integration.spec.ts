import { test, expect } from '@playwright/test'

test.describe('API Integration Tests', () => {
  const API_BASE = 'http://localhost:5000/api'
  const TEST_TOKEN = 'test-token' // For testing without auth

  test('should fetch test list from API', async ({ request }) => {
    const response = await request.get(`${API_BASE}/admin/tests`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
      },
    })
    // Accept both 200 (if auth disabled) and 401 (if auth required)
    expect([200, 401]).toContain(response.status())

    const data = await response.json()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)
  })

  test('should fetch specific test config', async ({ request }) => {
    // Get test list first
    const listResponse = await request.get(`${API_BASE}/admin/tests`)
    const tests = await listResponse.json()
    const testId = tests[0].id

    // Get test config
    const response = await request.get(`${API_BASE}/tests/${testId}/config`)
    expect(response.status()).toBe(200)

    const data = await response.json()
    expect(data.id).toBe(testId)
    expect(data.questions).toBeDefined()
  })

  test('should create test via API', async ({ request }) => {
    const response = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'API Test - ' + Date.now(),
        description: 'Test created via API',
        duration: 30,
      },
    })

    expect(response.status()).toBe(201)
    const data = await response.json()
    expect(data.id).toBeDefined()
    expect(data.name).toContain('API Test')
  })

  test('should update test via API', async ({ request }) => {
    // Create test first
    const createResponse = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Test to Update',
        description: 'Original description',
        duration: 30,
      },
    })
    const testId = (await createResponse.json()).id

    // Update test
    const updateResponse = await request.put(`${API_BASE}/admin/tests/${testId}`, {
      data: {
        name: 'Updated Test Name',
        description: 'Updated description',
        duration: 45,
      },
    })

    expect(updateResponse.status()).toBe(200)
    const data = await updateResponse.json()
    expect(data.name).toBe('Updated Test Name')
    expect(data.duration).toBe(45)
  })

  test('should delete test via API', async ({ request }) => {
    // Create test first
    const createResponse = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Test to Delete',
        description: 'Will be deleted',
        duration: 30,
      },
    })
    const testId = (await createResponse.json()).id

    // Delete test
    const deleteResponse = await request.delete(`${API_BASE}/admin/tests/${testId}`)
    expect(deleteResponse.status()).toBe(200)

    // Verify deleted
    const getResponse = await request.get(`${API_BASE}/admin/tests/${testId}`)
    expect(getResponse.status()).toBe(404)
  })

  test('should add indicator to test', async ({ request }) => {
    // Get existing test
    const listResponse = await request.get(`${API_BASE}/admin/tests`)
    const tests = await listResponse.json()
    const testId = tests[0].id

    // Add indicator
    const response = await request.post(`${API_BASE}/admin/tests/${testId}/indicators`, {
      data: {
        name: 'API Indicator',
        description: 'Added via API',
        order: 0,
      },
    })

    expect(response.status()).toBe(201)
    const data = await response.json()
    expect(data.name).toBe('API Indicator')
  })

  test('should add question to test', async ({ request }) => {
    // Get existing test
    const listResponse = await request.get(`${API_BASE}/admin/tests`)
    const tests = await listResponse.json()
    const testId = tests[0].id

    // Add question
    const response = await request.post(`${API_BASE}/admin/tests/${testId}/questions`, {
      data: {
        text: 'API Test Question?',
        type: 'TRUE_FALSE',
        order: 0,
      },
    })

    expect(response.status()).toBe(201)
    const data = await response.json()
    expect(data.text).toBe('API Test Question?')
  })

  test('should publish test via API', async ({ request }) => {
    // Create test
    const createResponse = await request.post(`${API_BASE}/admin/tests`, {
      data: {
        name: 'Test to Publish',
        description: 'Will be published',
        duration: 30,
      },
    })
    const testId = (await createResponse.json()).id

    // Publish test
    const publishResponse = await request.post(`${API_BASE}/admin/tests/${testId}/publish`)
    expect(publishResponse.status()).toBe(200)

    // Verify published
    const getResponse = await request.get(`${API_BASE}/admin/tests/${testId}`)
    const data = await getResponse.json()
    expect(data.isPublished).toBe(true)
  })

  test('should submit exam answers', async ({ request }) => {
    // Get published test
    const listResponse = await request.get(`${API_BASE}/admin/tests`)
    const tests = await listResponse.json()
    const publishedTest = tests.find((t: Record<string, unknown>) => t.isPublished) as Record<string, unknown> | undefined

    if (!publishedTest) {
      test.skip()
      return
    }

    // Submit answers
    const response = await request.post(`${API_BASE}/tests/${publishedTest.id}/submit`, {
      data: {
        answers: (publishedTest.questions as Record<string, unknown>[]).map((q: Record<string, unknown>) => ({
          questionId: q.id,
          answer: 'Yes',
        })),
      },
    })

    expect(response.status()).toBe(201)
    const data = await response.json()
    expect(data.resultId).toBeDefined()
  })
})
