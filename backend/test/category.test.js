const request = require('supertest');

const baseURL = "http://localhost:5001";

describe('Category API test', () => {
  it('should be able to successfully create a category', async () => {
    const newCategory = {
      category_name: "Programming" + Date.now(),
      description: "Software development and coding workshops"
    };

    const response = await request(baseURL)
      .post('/api/categories')
      .send(newCategory);

    expect(response.statusCode).toBe(201); 
    expect(response.body).toHaveProperty('_id');
  });
});

describe('Category API test', () => {
  it('should be able to successfully get the category list', async () => {
    const response = await request(baseURL).get('/api/categories');
    expect(response.statusCode).toBe(200);
  });
});

describe('Category API test', () => {
  it('should be able to update an existing category', async () => {
    const categoryToUpdate = {
      category_name: "Initial Name" + Date.now(),
      description: "Initial Description"
    };
    const createRes = await request(baseURL).post('/api/categories').send(categoryToUpdate);
    const categoryId = createRes.body._id;

    const updatedData = {
      category_name: "Programming" + Date.now(),
      description: "Software development and coding workshops"
    };

    const response = await request(baseURL)
      .put(`/api/categories/${categoryId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
  });
});

describe('Category API test', () => {
  it('should be able to delete a category', async () => {
    const categoryToDelete = { 
      category_name: "Initial Name" + Date.now(), 
      description: "Initial Description" 
    };
    const createRes = await request(baseURL).post('/api/categories').send(categoryToDelete);
    const categoryId = createRes.body._id;

    const response = await request(baseURL).delete(`/api/categories/${categoryId}`);

    expect(response.statusCode).toBe(200); 
  });
});