import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema({
    pypeCrmApiKey: {
        type: String,
        default: ''
    },
    pypeCrmEndpoint: {
        type: String,
        default: 'https://pypecrm.com/api/leads'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// We will only have one document for global integration settings
export default mongoose.models.Integration || mongoose.model('Integration', integrationSchema);
