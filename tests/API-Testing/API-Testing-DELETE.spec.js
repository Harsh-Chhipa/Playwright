import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

async function getToken(request) {
  const response = await request.post(`${baseURL}/auth`, {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  const body = await response.json();
  return body.token;
}

async function createBooking(request) {
  const response = await request.post(`${baseURL}/booking`, {
    data: {
      firstname: 'Test',
      lastname: 'User',
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-01-01',
        checkout: '2025-01-05'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.bookingid).toBeTruthy();
  return body.bookingid;
}

test.describe('Restful Booker - DELETE /booking API Tests', () => {

  test('DEL_TC_001 - Verify existing booking can be deleted', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).toBe(201);
  });

  test('DEL_TC_002 - Verify deleted booking is no longer accessible', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });

  test('DEL_TC_003 - Verify booking can be deleted using valid token', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).toBe(201);
  });

  test('DEL_TC_004 - Verify another existing booking can be deleted', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).toBe(201);
  });

  test('DEL_TC_005 - Verify DELETE request works without request body', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).toBe(201);
  });

  test('DEL_TC_006 - Verify booking cannot be deleted without authentication', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`);

    expect(response.status()).toBe(403);
  });

  test('DEL_TC_007 - Verify booking cannot be deleted with invalid token', async ({ request }) => {
    const bookingId = await createBooking(request);

    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: 'token=invalidToken123'
      }
    });

    expect(response.status()).toBe(403);
  });

  test('DEL_TC_008 - Verify non-existing booking cannot be deleted', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${baseURL}/booking/999999999`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).toBe(405);
  });

  test('DEL_TC_009 - Verify DELETE with invalid booking ID format', async ({ request }) => {
    const token = await getToken(request);

    const response = await request.delete(`${baseURL}/booking/abc`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(response.status()).not.toBe(201);
  });

  test('DEL_TC_010 - Verify already deleted booking cannot be deleted again', async ({ request }) => {
    const token = await getToken(request);
    const bookingId = await createBooking(request);

    const firstResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(firstResponse.status()).toBe(201);

    const secondResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(secondResponse.status()).toBe(405);
  });
});
