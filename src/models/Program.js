import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: [true, 'University is required']
    },
    name: {
        type: String,
        required: [true, 'Program name is required'],
        trim: true
    },
    slug: {
        type: String,
        unique: true   // unique:true already creates an index — no need for schema.index({ slug:1 })
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['MBA', 'MCA', 'BBA', 'BCA', 'B.Com', 'M.Com', 'BA', 'MA', 'B.Sc', 'M.Sc', 'B.Tech', 'M.Tech', 'PhD', 'Diploma', 'Certificate', 'Other'],
        default: 'Other'
    },
    level: {
        type: String,
        required: [true, 'Level is required'],
        enum: ['Undergraduate', 'Postgraduate', 'Doctorate', 'Diploma', 'Certificate'],
        default: 'Undergraduate'
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        default: '2 Years'
    },
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid', 'Distance'],
        default: 'Online'
    },
    fee: {
        type: Number,
        required: [true, 'Fee is required'],
        default: 0
    },
    feePeriod: {
        type: String,
        enum: ['Total', 'Per Year', 'Per Semester', 'Per Month'],
        default: 'Total'
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
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
    eligibility:     { type: String, default: "Bachelor's degree from a recognized university" },
    image:           { type: String, default: '' },
    brochureUrl:     { type: String, default: '' },
    youtubeUrl:      { type: String, default: '' },
    syllabus:        { type: [String], default: [] },
    highlights:      { type: [String], default: [] },
    careerOptions:   { type: [String], default: [] },
    specializations: { type: [String], default: [] },
    semesters:       { type: Number, default: 4 },
    credits:         { type: Number, default: 0 },
    featured:        { type: Boolean, default: false },
    ranking:         { type: Number },
    isActive:        { type: Boolean, default: true },
}, { timestamps: true });

ProgramSchema.pre('save', function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') +
            '-' + Math.random().toString(36).substring(2, 7);
    }
    next();
});

// Compound + supporting indexes (slug covered by unique:true above)
ProgramSchema.index({ name: 'text', category: 'text', description: 'text' });
ProgramSchema.index({ isActive: 1, featured: -1, createdAt: -1 });
ProgramSchema.index({ universityId: 1, isActive: 1 });
ProgramSchema.index({ category: 1, isActive: 1 });
ProgramSchema.index({ level: 1 });
ProgramSchema.index({ fee: 1 });

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
