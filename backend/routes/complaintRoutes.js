const express = require('express');
const Complaint = require('../models/Complaint');
const { auth } = require('../middleware/auth');

const router = express.Router();

// POST /api/complaints - Submit complaint (public)
router.post('/', async (req, res) => {
    try {
        const complaint = await Complaint.create(req.body);
        res.status(201).json({ success: true, message: 'Complaint submitted successfully', data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET /api/complaints - Get all complaints (auth required)
router.get('/', auth, async (req, res) => {
    try {
        const { status, category, priority } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (category) filter.category = category;
        if (priority) filter.priority = priority;

        const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: complaints.length, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/complaints/:id - Get single complaint
router.get('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }
        res.json({ success: true, data: complaint });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/complaints/:id - Update complaint (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }
        res.json({ success: true, data: complaint });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/complaints/:id - Delete complaint (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }
        res.json({ success: true, message: 'Complaint deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
