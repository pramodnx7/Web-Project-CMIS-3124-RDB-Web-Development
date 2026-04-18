const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'News title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    summary: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['general', 'announcement', 'event', 'promotion', 'update'],
        default: 'general'
    },
    image: {
        type: String,
        default: ''
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
