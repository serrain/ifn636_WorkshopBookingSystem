const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
    try {
        const { category_name, description } = req.body;
        const newCategory = new Category({ category_name, description });
        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).send('Server Error: ' + err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;