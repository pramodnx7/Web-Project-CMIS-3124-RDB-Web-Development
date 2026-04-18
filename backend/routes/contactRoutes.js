const express = require('express');
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');

const router = express.Router();

// POST /api/contacts - Submit contact form (public)
router.post('/', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, message: 'Your message has been sent successfully!', data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET /api/contacts - Get all contacts (auth required)
router.get('/', auth, async (req, res) => {
    try {
        const { status, category } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (category) filter.category = category;

        const contacts = await Contact.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/contacts/:id - Get single contact (auth required)
router.get('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/contacts/:id - Update contact status (auth required) 
router.put('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/contacts/:id - Delete contact (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found.' });
        }
        res.json({ success: true, message: 'Contact deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
