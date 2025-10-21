import { test, expect } from '@playwright/test';

/**
 * API Tests for Project Endpoints
 * Testing profile-nest backend endpoints consumed by profile-next
 */

const BASE_URL = process.env.TEST_ENV !== 'development' 
  ? 'https://kind-creation-production.up.railway.app' 
  : 'http://localhost:3001';

test.describe('Project API Endpoints', () => {
  
  test('GET /project - should return example projects', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/project`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Verify response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('code');
    expect(data).toHaveProperty('data');
    
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBeTruthy();
    
    // If there are projects, verify structure
    if (data.data.length > 0) {
      const project = data.data[0];
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('desc');
      expect(project).toHaveProperty('techs');
    }
  });

  test('GET /project - should return projects with correct properties', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/project`);
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      data.data.forEach((project: Record<string, unknown>) => {
        // Required fields
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('desc');
        
        // Title should be an object with locale keys
        expect(typeof project.title).toBe('object');
        
        // Desc should be an object with locale keys  
        expect(typeof project.desc).toBe('object');
        
        // Techs should be an array
        expect(Array.isArray(project.techs)).toBeTruthy();
      });
    }
  });

  test('GET /project - response should be fast (< 2s)', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${BASE_URL}/project`);
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    
    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(2000);
  });
});
