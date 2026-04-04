const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
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

router.put('/:id', [protect, admin], async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.json(category);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', [protect, admin], async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Category removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;