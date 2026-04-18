const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['chairman', 'general_manager', 'board_of_directors', 'corporate_management', 'executive_management'],
        index: true
    },
    description: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    office: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Personnel', personnelSchema);
