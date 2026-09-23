import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker - POST /auth API Tests', () => {

  // TC 01 - Valid username and password
  test('AUTH_TC_001 - Verify token is generated with valid credentials', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(body.token).not.toBe('');

    console.log('Token:', body.token);
  });


  // TC 02 - Valid admin credentials
  test('AUTH_TC_002 - Verify authentication with valid admin credentials', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeTruthy();
  });


  // TC 03 - Verify token field
  test('AUTH_TC_003 - Verify response contains token field', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });


  // TC 04 - Verify token is a string
  test('AUTH_TC_004 - Verify token is returned in valid format', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const body = await response.json();

    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });


  // TC 05 - Multiple valid authentication requests
  test('AUTH_TC_005 - Verify multiple valid authentication requests', async ({ request }) => {

    const response1 = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    const response2 = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response1.status()).toBe(200);
    expect(response2.status()).toBe(200);

    const body1 = await response1.json();
    const body2 = await response2.json();

    expect(body1.token).toBeTruthy();
    expect(body2.token).toBeTruthy();
  });


  // TC 06 - Invalid username
  test('AUTH_TC_006 - Verify authentication fails with invalid username', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'invalidUser',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');

    console.log(body);
  });


  // TC 07 - Invalid password
  test('AUTH_TC_007 - Verify authentication fails with invalid password', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'wrongPassword'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });


  // TC 08 - Username missing
  test('AUTH_TC_008 - Verify authentication when username is missing', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });


  // TC 09 - Password missing
  test('AUTH_TC_009 - Verify authentication when password is missing', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });


  // TC 10 - Empty request body
  test('AUTH_TC_010 - Verify authentication with empty request body', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {}
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('reason');
    expect(body.reason).toBe('Bad credentials');
  });

});