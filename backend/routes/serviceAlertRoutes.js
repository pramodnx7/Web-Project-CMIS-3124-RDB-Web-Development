const express = require('express');
const ServiceAlert = require('../models/ServiceAlert');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/alerts - Get active alerts (public)
router.get('/', async (req, res) => {
    try {
        const filter = {
            isActive: true,
            $or: [
                { expiryDate: { $exists: false } },
                { expiryDate: null },
                { expiryDate: { $gte: new Date() } }
            ]
        };

        const alerts = await ServiceAlert.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: alerts.length, data: alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/alerts/all - Get all alerts (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const alerts = await ServiceAlert.find().sort({ createdAt: -1 });
        res.json({ success: true, count: alerts.length, data: alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/alerts/:id - Get single alert
router.get('/:id', async (req, res) => {
    try {
        const alert = await ServiceAlert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found.' });
        }
        res.json({ success: true, data: alert });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/alerts - Create alert (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const alert = await ServiceAlert.create(req.body);
        res.status(201).json({ success: true, data: alert });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/alerts/:id - Update alert (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const alert = await ServiceAlert.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found.' });
        }
        res.json({ success: true, data: alert });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/alerts/:id - Delete alert (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const alert = await ServiceAlert.findByIdAndDelete(req.params.id);
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found.' });
        }
        res.json({ success: true, message: 'Alert deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
