const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Award title is required'],
        trim: true
    },
    organization: {
        type: String,
        required: [true, 'Issuing organization is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        default: '../Assests/achievement.png'
    },
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    category: {
        type: String,
        enum: ['excellence', 'innovation', 'service', 'sustainability', 'leadership', 'other'],
        default: 'excellence'
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Award', awardSchema);
