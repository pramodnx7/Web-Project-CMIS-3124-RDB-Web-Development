const express = require('express');
const Award = require('../models/Award');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/awards - Get all published awards (public)
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (featured === 'true') filter.isFeatured = true;

        const awards = await Award.find(filter).sort({ displayOrder: 1, year: -1, createdAt: -1 });
        res.json({ success: true, count: awards.length, data: awards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/awards/all - Get all awards including unpublished (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const awards = await Award.find().sort({ displayOrder: 1, createdAt: -1 });
        res.json({ success: true, count: awards.length, data: awards });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/awards/:id - Get single award
router.get('/:id', async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) {
            return res.status(404).json({ success: false, message: 'Award not found.' });
        }
        res.json({ success: true, data: award });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/awards - Create award (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const award = await Award.create(req.body);
        res.status(201).json({ success: true, data: award });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/awards/:id - Update award (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!award) {
            return res.status(404).json({ success: false, message: 'Award not found.' });
        }
        res.json({ success: true, data: award });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/awards/:id - Delete award (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const award = await Award.findByIdAndDelete(req.params.id);
        if (!award) {
            return res.status(404).json({ success: false, message: 'Award not found.' });
        }
        res.json({ success: true, message: 'Award deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
