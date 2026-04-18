const express = require('express');
const Branch = require('../models/Branch');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/branches - Get all active branches (public)
router.get('/', async (req, res) => {
    try {
        const { province, district } = req.query;
        const filter = { isActive: true };
        if (province) filter.province = province;
        if (district) filter.district = district;

        const branches = await Branch.find(filter).sort({ name: 1 });
        res.json({ success: true, count: branches.length, data: branches });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/branches/all - Get all branches including inactive (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const branches = await Branch.find().sort({ name: 1 });
        res.json({ success: true, count: branches.length, data: branches });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/branches/:id - Get single branch
router.get('/:id', async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) {
            return res.status(404).json({ success: false, message: 'Branch not found.' });
        }
        res.json({ success: true, data: branch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/branches - Create branch (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.status(201).json({ success: true, data: branch });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/branches/:id - Update branch (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!branch) {
            return res.status(404).json({ success: false, message: 'Branch not found.' });
        }
        res.json({ success: true, data: branch });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/branches/:id - Delete branch (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) {
            return res.status(404).json({ success: false, message: 'Branch not found.' });
        }
        res.json({ success: true, message: 'Branch deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
