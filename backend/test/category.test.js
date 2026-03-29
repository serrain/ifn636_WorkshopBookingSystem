const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    const url = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
    await mongoose.connect(url);

    await User.deleteMany({ email: "admin1@test.com" });
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash("123456", 10);
    
    await User.create({
        username: "AdminUser",
        email: "admin1@test.com",
        password: hashedPassword,
        role: "admin"
    });
});

describe('Category API test', () => {
    let adminToken;

    beforeAll(async () => {
        const loginRes = await request(app)
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

        const response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newCategory);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });



    it('should be able to successfully get the category list', async () => {
        const response = await request(app).get('/api/categories');
        expect(response.statusCode).toBe(200);
    });



    it('should be able to update an existing category', async () => {
        const categoryToUpdate = {
            category_name: "Initial Name" + Date.now(),
            description: "Initial Description"
        };
        const createRes = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(categoryToUpdate);
        const categoryId = createRes.body._id;

        const updatedData = {
            category_name: "Programming" + Date.now(),
            description: "Software development and coding workshops"
        };

        const response = await request(app)
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
        const createRes = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(categoryToDelete);
        const categoryId = createRes.body._id;

        const response = await request(app)
            .delete(`/api/categories/${categoryId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});