import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env');
}

// Global cache survives hot reloads in dev
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Import models to ensure they are registered correctly for population
import Admin from '@/models/Admin';
import University from '@/models/University';
import Program from '@/models/Program';
import Enquiry from '@/models/Enquiry';
import CourseFinderQuestion from '@/models/CourseFinderQuestion';
import SEO from '@/models/seoModel';


async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 25,
      minPoolSize: 5,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }).then(async (m) => {
      console.log('✅ MongoDB connected');
      // Ensure all model indexes are strictly built and verified at startup
      await Promise.all([
        Admin.init(),
        University.init(),
        Program.init(),
        Enquiry.init(),
        CourseFinderQuestion.init(),
        SEO.init()
      ]);
      console.log('🚀 All DB models initialized and indexed');
      return m;
    }).catch(e => {
      cached.promise = null;
      console.error('❌ MongoDB error:', e.message);
      throw e;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
