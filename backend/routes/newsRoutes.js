const express = require('express');
const News = require('../models/News');
const { auth } = require('../middleware/auth');

const router = express.Router();

// GET /api/news - Get all published news (public)
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        const filter = { isPublished: true };
        if (category) filter.category = category;
        if (featured === 'true') filter.isFeatured = true;

        const news = await News.find(filter).sort({ publishDate: -1 });
        res.json({ success: true, count: news.length, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/news/all - Get all news including unpublished (auth required)
router.get('/all', auth, async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json({ success: true, count: news.length, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/news/:id - Get single news item
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found.' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/news - Create news (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const news = await News.create(req.body);
        res.status(201).json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/news/:id - Update news (auth required)
router.put('/:id', auth, async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found.' });
        }
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/news/:id - Delete news (auth required)
router.delete('/:id', auth, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'News not found.' });
        }
        res.json({ success: true, message: 'News deleted.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
