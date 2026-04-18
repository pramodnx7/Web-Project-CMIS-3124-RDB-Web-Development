const express = require('express');
const Personnel = require('../models/Personnel');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/personnel - Get all active personnel (public)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = { isActive: true };
        if (category) filter.category = category;

        const personnel = await Personnel.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: personnel.length, data: personnel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/personnel/all - Get all personnel including inactive (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const { category } = req.query;
        const filter = {};
        if (category) filter.category = category;

        const personnel = await Personnel.find(filter).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: personnel.length, data: personnel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/personnel/:id - Get single personnel
router.get('/:id', async (req, res) => {
    try {
        const person = await Personnel.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ success: false, message: 'Personnel not found.' });
        }
        res.json({ success: true, data: person });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/personnel - Create personnel (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const person = await Personnel.create(req.body);
        res.status(201).json({ success: true, data: person });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/personnel/:id - Update personnel (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const person = await Personnel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!person) {
            return res.status(404).json({ success: false, message: 'Personnel not found.' });
        }
        res.json({ success: true, data: person });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/personnel/:id - Delete personnel (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const person = await Personnel.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ success: false, message: 'Personnel not found.' });
        }
        res.json({ success: true, message: 'Personnel deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
