const express = require('express');
const Career = require('../models/Career');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/careers - Get all active careers (public)
router.get('/', async (req, res) => {
    try {
        const { department, type } = req.query;
        const filter = { isActive: true, closingDate: { $gte: new Date() } };
        if (department) filter.department = department;
        if (type) filter.type = type;

        const careers = await Career.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: careers.length, data: careers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/careers/all - Get all careers including expired (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.json({ success: true, count: careers.length, data: careers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/careers/:id - Get single career
router.get('/:id', async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found.' });
        }
        res.json({ success: true, data: career });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/careers - Create career (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const career = await Career.create(req.body);
        res.status(201).json({ success: true, data: career });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/careers/:id - Update career (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found.' });
        }
        res.json({ success: true, data: career });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/careers/:id - Delete career (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found.' });
        }
        res.json({ success: true, message: 'Career deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
