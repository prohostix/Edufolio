import mongoose from 'mongoose';
import slugify from 'slugify';

const UniversitySchema = new mongoose.Schema({
    name:        { type: String, required: [true, 'University name is required'], trim: true },
    slug:        { type: String, unique: true }, // unique:true already creates the index
    shortName:   { type: String, trim: true },
    logo:        { type: String, default: '' },
    banner:      { type: String, default: '' },
    description: { type: String, required: [true, 'Description is required'] },
    metaTitle:       { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    metaKeywords:    { type: String, trim: true },
    canonicalUrl:    { type: String, trim: true },
    ogTitle:         { type: String, trim: true },
    ogDescription:   { type: String, trim: true },
    ogImage:         { type: String, trim: true },
    robots: {
        type: String,
        enum: ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'],
        default: 'index, follow'
    },
    establishedYear: { type: Number },
    location:  { type: String, required: [true, 'Location is required'] },
    address:   { type: String },
    website:   { type: String },
    email:     { type: String },
    phone:     { type: String },
    rating: {
        type: String,
        enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Rated'],
        default: 'Not Rated'
    },
    accreditations: { type: [String], default: [] },
    approvals:      { type: [String], default: [] },
    facilities:     { type: [String], default: [] },
    highlights:     { type: [String], default: [] },
    minFee:    { type: Number, default: 0 },
    maxFee:    { type: Number, default: 0 },
    featured:  { type: Boolean, default: false },
    ranking:   { type: Number },
    isActive:  { type: Boolean, default: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

UniversitySchema.virtual('programs', {
    ref: 'Program',
    localField: '_id',
    foreignField: 'universityId',
    count: true
});

UniversitySchema.pre('save', function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

// Compound + supporting indexes (slug covered by unique:true above)
UniversitySchema.index({ name: 'text', location: 'text', description: 'text' });
UniversitySchema.index({ isActive: 1, featured: -1, createdAt: -1 });
UniversitySchema.index({ rating: 1, isActive: 1 });

export default mongoose.models.University || mongoose.model('University', UniversitySchema);
