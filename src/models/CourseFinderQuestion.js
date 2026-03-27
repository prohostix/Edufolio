import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, default: 'fa-circle' },
  categories: [{ type: String }],
  min: { type: Number },
  max: { type: Number },
}, { _id: false });

const CourseFinderQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  field: { type: String, required: true, trim: true },
  order: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
  options: [OptionSchema],
}, { timestamps: true });

CourseFinderQuestionSchema.index({ order: 1 });

export default mongoose.models.CourseFinderQuestion ||
  mongoose.model('CourseFinderQuestion', CourseFinderQuestionSchema);
