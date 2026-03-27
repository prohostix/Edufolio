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
import '@/models/Admin';
import '@/models/University';
import '@/models/Program';
import '@/models/Enquiry';

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
    }).then(m => {
      console.log('✅ MongoDB connected');
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
