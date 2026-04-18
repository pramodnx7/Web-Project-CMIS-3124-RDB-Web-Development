const express = require('express');
const SavingsProduct = require('../models/SavingsProduct');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/savings-products - Get all active savings products (public)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category) filter.category = category;

        const products = await SavingsProduct.find(filter).sort({ name: 1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/savings-products/all - Get all savings products (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const products = await SavingsProduct.find().sort({ createdAt: -1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/savings-products/:id - Get single savings product
router.get('/:id', async (req, res) => {
    try {
        const product = await SavingsProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Savings product not found.' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/savings-products - Create savings product (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const product = await SavingsProduct.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/savings-products/:id - Update savings product (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const product = await SavingsProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Savings product not found.' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/savings-products/:id - Delete savings product (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await SavingsProduct.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Savings product not found.' });
        }
        res.json({ success: true, message: 'Savings product deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
