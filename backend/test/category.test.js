const request = require('supertest');

const baseURL = "http://localhost:5001";

describe('Category API test', () => {
  it('should be able to successfully create a category', async () => {
    const newCategory = {
      category_name: "Programming",
      description: "Software development and coding workshops"
    };

    const response = await request(baseURL)
      .post('/api/categories')
      .send(newCategory);

    expect(response.statusCode).toBe(201); 
    expect(response.body).toHaveProperty('_id');
    expect(response.body.category_name).toBe("Programming");
  });
});

describe('Category API test', () => {
  it('be able to successfully get the category list', async () => {
    const response = await request(baseURL).get('/api/categories');
    expect(response.statusCode).toBe(200);
  });
});
