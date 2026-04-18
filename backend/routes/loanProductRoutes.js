const express = require('express');
const LoanProduct = require('../models/LoanProduct');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/loan-products - Get all active loan products (public)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category) filter.category = category;

        const products = await LoanProduct.find(filter).sort({ name: 1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/loan-products/all - Get all loan products including inactive (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const products = await LoanProduct.find().sort({ name: 1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/loan-products/:id - Get single loan product
router.get('/:id', async (req, res) => {
    try {
        const product = await LoanProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Loan product not found.' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/loan-products - Create loan product (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const product = await LoanProduct.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/loan-products/:id - Update loan product (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const product = await LoanProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Loan product not found.' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/loan-products/:id - Delete loan product (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await LoanProduct.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Loan product not found.' });
        }
        res.json({ success: true, message: 'Loan product deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
