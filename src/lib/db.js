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

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'edufolio',           // explicit DB name — avoids re-auth on every request
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,  // keep connection alive
      maxIdleTimeMS: 60000,         // recycle idle connections
      compressors: 'zlib',          // compress wire traffic
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
