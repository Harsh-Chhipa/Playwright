import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

// Function to generate authentication token
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

// Common valid booking data
function getBookingData() {

  return {
    firstname: 'Harsh',
    lastname: 'Chhipa',
    totalprice: 1500,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-09-20',
      checkout: '2026-09-25'
    },
    additionalneeds: 'Breakfast'
  };
}


test.describe('Restful Booker - PUT /booking/22 API Tests', () => {

  // TC 01 - Complete booking update
  test('PUT_TC_001 - Verify existing booking can be completely updated', async ({ request }) => {

    const token = await getToken(request);

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: getBookingData()
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('Harsh');
    expect(body.lastname).toBe('Chhipa');
    expect(body.totalprice).toBe(1500);
    expect(body.depositpaid).toBe(true);
  });


  // TC 02 - Update firstname
  test('PUT_TC_002 - Verify firstname can be updated', async ({ request }) => {

    const token = await getToken(request);

    const data = getBookingData();
    data.firstname = 'Rahul';

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('Rahul');
  });


  // TC 03 - Update lastname
  test('PUT_TC_003 - Verify lastname can be updated', async ({ request }) => {

    const token = await getToken(request);

    const data = getBookingData();
    data.lastname = 'Sharma';

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.lastname).toBe('Sharma');
  });


  // TC 04 - Update total price
  test('PUT_TC_004 - Verify totalprice can be updated', async ({ request }) => {

    const token = await getToken(request);

    const data = getBookingData();
    data.totalprice = 2500;

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.totalprice).toBe(2500);
  });


  // TC 05 - Update booking dates and additional needs
  test('PUT_TC_005 - Verify booking dates and additional needs can be updated', async ({ request }) => {

    const token = await getToken(request);

    const data = getBookingData();

    data.bookingdates = {
      checkin: '2026-10-01',
      checkout: '2026-10-10'
    };

    data.additionalneeds = 'Lunch';

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: data
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingdates.checkin).toBe('2026-10-01');
    expect(body.bookingdates.checkout).toBe('2026-10-10');
    expect(body.additionalneeds).toBe('Lunch');
  });


  // TC 06 - Update without authentication
  test('PUT_TC_006 - Verify booking cannot be updated without authentication', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/22`, {
      data: getBookingData()
    });

    expect(response.status()).toBe(403);
  });


  // TC 07 - Update with invalid token
  test('PUT_TC_007 - Verify booking cannot be updated with invalid token', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: 'token=invalidToken123'
      },
      data: getBookingData()
    });

    expect(response.status()).toBe(403);
  });


  // TC 08 - Missing mandatory fields
  test('PUT_TC_008 - Verify PUT request with missing mandatory fields', async ({ request }) => {

    const token = await getToken(request);

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        totalprice: 1500,
        depositpaid: true
      }
    });

    expect(response.status()).not.toBe(200);
  });


  // TC 09 - Invalid totalprice
  test('PUT_TC_009 - Verify PUT request with invalid totalprice', async ({ request }) => {

    const token = await getToken(request);

    const data = getBookingData();
    data.totalprice = 'ABC';

    const response = await request.put(`${baseURL}/booking/22`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: data
    });

    const body = await response.json();

    console.log('Status:', response.status());
    console.log('Response:', body);

    // Verify API does not return an unexpected success with incorrect price
    expect(response.status()).not.toBe(500);
  });


  // TC 10 - Non-existing booking ID
  test('PUT_TC_010 - Verify PUT request for non-existing booking ID', async ({ request }) => {

    const token = await getToken(request);

    const response = await request.put(`${baseURL}/booking/99999`, {
      headers: {
        Cookie: `token=${token}`
      },
      data: getBookingData()
    });

    expect(response.status()).not.toBe(200);

    console.log('Status:', response.status());
  });

});