const request = require('supertest');

const baseURL = "http://localhost:5001"; 

describe('Category API test', () => {
  it('be able to successfully get the category list', async () => {
    const response = await request(baseURL).get('/api/categories');
    expect(response.statusCode).toBe(200);
  });
});