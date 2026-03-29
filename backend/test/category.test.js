const request = require('supertest');

const baseURL = "http://localhost:5001";

describe('Category API test', () => {
    let adminToken;

    beforeAll(async () => {
        const loginRes = await request(baseURL)
            .post('/api/auth/login')
            .send({
                email: "admin1@test.com",
                password: "123456"
            });

        adminToken = loginRes.body.token;
    });

    it('should be able to successfully create a category', async () => {
        const newCategory = {
            category_name: "Programming" + Date.now(),
            description: "Software development and coding workshops"
        };

        const response = await request(baseURL)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newCategory);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });



    it('should be able to successfully get the category list', async () => {
        const response = await request(baseURL).get('/api/categories');
        expect(response.statusCode).toBe(200);
    });



    it('should be able to update an existing category', async () => {
        const categoryToUpdate = {
            category_name: "Initial Name" + Date.now(),
            description: "Initial Description"
        };
        const createRes = await request(baseURL)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(categoryToUpdate);
        const categoryId = createRes.body._id;

        const updatedData = {
            category_name: "Programming" + Date.now(),
            description: "Software development and coding workshops"
        };

        const response = await request(baseURL)
            .put(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
    });



    it('should be able to delete a category', async () => {
        const categoryToDelete = {
            category_name: "Initial Name" + Date.now(),
            description: "Initial Description"
        };
        const createRes = await request(baseURL)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(categoryToDelete);
        const categoryId = createRes.body._id;

        const response = await request(baseURL)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);
    });
});