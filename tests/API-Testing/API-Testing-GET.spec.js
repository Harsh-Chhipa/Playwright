import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker - GET /booking API Tests', () => {
  test('GET_TC_001 - Verify API returns all booking IDs', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET_TC_002 - Verify booking IDs are returned in JSON format', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    if (body.length > 0) expect(body[0]).toHaveProperty('bookingid');
  });

  test('GET_TC_003 - Verify bookings can be filtered using firstname', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?firstname=Jim`);
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('GET_TC_004 - Verify bookings can be filtered using lastname', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?lastname=Brown`);
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('GET_TC_005 - Verify bookings can be filtered using dates', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?checkin=2022-01-01&checkout=2022-01-31`);
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('GET_TC_006 - Verify API with non-existing firstname', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?firstname=XYZ123`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(0);
  });

  test('GET_TC_007 - Verify API with invalid date format', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?checkin=invalid-date`);
    expect(response.status()).toBe(500);
  });

  test('GET_TC_008 - Verify API with special characters in firstname', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`, { params: { firstname: '@#$%^' } });
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('GET_TC_009 - Verify API with unsupported query parameter', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking?invalidparam=test`);
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBeTruthy();
  });

  test('GET_TC_010 - Verify API rejects POST request without body', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`);
    expect(response.status()).not.toBe(200);
  });
});
