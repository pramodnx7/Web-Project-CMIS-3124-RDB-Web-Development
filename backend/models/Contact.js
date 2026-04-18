const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['general', 'loans', 'savings', 'leasing', 'complaint', 'feedback', 'other']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        enum: ['mr', 'mrs', 'miss', 'dr', 'prof']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    contact: {
        type: String,
        required: [true, 'Contact number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
    },
    branch: {
        type: String,
        required: [true, 'Branch is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    status: {
        type: String,
        enum: ['new', 'in_progress', 'resolved', 'closed'],
        default: 'new'
    },
    adminNotes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
