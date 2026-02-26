const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Edufolio - Find Your Dream University'
    },
    description: {
        type: String,
        default: 'Discover top universities and programs for your education journey.'
    },
    keywords: {
        type: String,
        default: 'education, universities, colleges, programs, courses'
    },
    author: {
        type: String,
        default: 'Edufolio'
    },
    ogImage: {
        type: String,
        default: ''
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// We will only have one document for global SEO settings
export default mongoose.models.SEO || mongoose.model('SEO', seoSchema);
