import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
import connectDB from '@/lib/db';
import { generateToken } from '@/lib/auth';

export async function POST(req) {
    console.log('DEBUG: POST /api/admin/login hit');
    try {
        await connectDB();
        const body = await req.json();
        console.log('DEBUG: Login body received:', JSON.stringify(body));
        const { email, password } = body;
        console.log('DEBUG: Login attempt for email:', email);

        if (!email || !password) {
            console.log('DEBUG: Missing email or password. Body:', body);
            return NextResponse.json({ message: 'Please provide email and password' }, { status: 400 });
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        if (!admin) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        if (!admin.isActive) {
            return NextResponse.json({ message: 'Account is disabled' }, { status: 401 });
        }

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }

        admin.lastLogin = new Date();
        await admin.save();

        const token = generateToken(admin._id);

        return NextResponse.json({
            message: 'Login successful',
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ message: 'Server error during login' }, { status: 500 });
    }
}
