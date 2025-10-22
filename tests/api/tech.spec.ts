import { test, expect } from '@playwright/test';

/**
 * API Tests for Tech Endpoints
 * Testing profile-nest backend tech endpoints consumed by profile-next
 */

const BASE_URL = process.env.TEST_ENV !== 'development' 
  ? 'https://kind-creation-production.up.railway.app' 
  : 'http://localhost:3001';

test.describe('Tech API Endpoints', () => {
  
  test('GET /tech/db - should return database techs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tech/db`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('code');
    expect(data).toHaveProperty('data');
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBeTruthy();
  });

  test('GET /tech/flatten - should return flattened techs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tech/flatten`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('success');
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBeTruthy();
    
    // Verify flattened structure
    if (data.data.length > 0) {
      const tech = data.data[0];
      expect(tech).toHaveProperty('nameId');
      expect(tech).toHaveProperty('nameBadge');
      expect(tech).toHaveProperty('afinidad');
      expect(tech).toHaveProperty('experiencia');
    }
  });

  test('GET /tech/cat - should return categorized techs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tech/cat`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('success');
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('dispoFw');
    expect(data.data).toHaveProperty('dispoLeng');
    expect(Array.isArray(data.data.dispoFw)).toBeTruthy();
    expect(Array.isArray(data.data.dispoLeng)).toBeTruthy();
  });

  test('GET /tech/full - should return full tech data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tech/full`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('success');
    expect(data.success).toBe(true);
    expect(data.data).toHaveProperty('techs');
    expect(data.data).toHaveProperty('flattenTechs');
    expect(data.data).toHaveProperty('dispoFw');
    expect(data.data).toHaveProperty('dispoLeng');
  });

  test('GET /tech/flatten - response should contain correct tech properties', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/tech/flatten`);
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      data.data.forEach((tech: Record<string, unknown>) => {
        expect(tech).toHaveProperty('nameId');
        expect(tech).toHaveProperty('nameBadge');
        expect(typeof tech.afinidad).toBe('number');
        expect(typeof tech.experiencia).toBe('number');
        expect(tech.afinidad).toBeGreaterThanOrEqual(0);
        expect(tech.afinidad).toBeLessThanOrEqual(100);
        expect(tech.experiencia).toBeGreaterThanOrEqual(0);
        expect(tech.experiencia).toBeLessThanOrEqual(100);
      });
    }
  });

  test('GET /tech endpoints - should be fast (< 2s)', async ({ request }) => {
    const endpoints = ['db', 'flatten', 'cat', 'full'];
    
    for (const endpoint of endpoints) {
      const startTime = Date.now();
      const response = await request.get(`${BASE_URL}/tech/${endpoint}`);
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      
      expect(response.ok()).toBeTruthy();
      expect(duration).toBeLessThan(2000);
    }
  });
});
