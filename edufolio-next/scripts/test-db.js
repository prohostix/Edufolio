const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing MongoDB Connection...');
console.log('URI:', process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : 'Undefined');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:');
        console.error(err.message);
        console.error('Full Error:', err);
        process.exit(1);
    }
};

connectDB();
