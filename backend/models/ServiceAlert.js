const mongoose = require('mongoose');

const serviceAlertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Alert title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Alert content is required']
    },
    type: {
        type: String,
        enum: ['info', 'warning', 'critical', 'maintenance'],
        default: 'info'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ServiceAlert', serviceAlertSchema);
